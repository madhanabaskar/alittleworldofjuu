import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const STORAGE_BUCKETS = {
  IMAGES: 'image-of_juu',
  VOICE_NOTES: 'voice_notes',
} as const;

export const storageService = {
  /**
   * Upload an image to the 'image-of_juu' Supabase storage bucket
   * Returns the direct public URL of the uploaded image
   */
  async uploadImage(file: File, folder = 'memories'): Promise<{ url: string | null; error: Error | null }> {
    if (!isSupabaseConfigured || !supabase) {
      return { url: null, error: new Error('Supabase is not configured.') };
    }

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${folder}/${Date.now()}_${sanitizedName}`;

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKETS.IMAGES)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Error uploading image to image-of_juu:', error);
        return { url: null, error };
      }

      // Try to generate a signed URL (for private buckets)
      const { data: signedData, error: signedError } = await supabase.storage
        .from(STORAGE_BUCKETS.IMAGES)
        .createSignedUrl(data.path, 60 * 60 * 24 * 365); // 1 year

      if (!signedError && signedData?.signedUrl) {
        return { url: signedData.signedUrl, error: null };
      }

      const { data: publicData } = supabase.storage
        .from(STORAGE_BUCKETS.IMAGES)
        .getPublicUrl(data.path);

      return { url: publicData.publicUrl, error: null };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Unknown upload error');
      console.error('Exception during image upload:', error);
      return { url: null, error };
    }
  },

  /**
   * Upload an audio file to the 'voice_notes' Supabase storage bucket
   * Returns a secure signed URL (or public URL fallback)
   */
  async uploadVoiceNote(file: File): Promise<{ url: string | null; error: Error | null }> {
    if (!isSupabaseConfigured || !supabase) {
      return { url: null, error: new Error('Supabase is not configured.') };
    }

    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `recordings/${Date.now()}_${sanitizedName}`;

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKETS.VOICE_NOTES)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Error uploading audio to voice_notes:', error);
        return { url: null, error };
      }

      // Try to generate a signed URL (for private buckets)
      const { data: signedData, error: signedError } = await supabase.storage
        .from(STORAGE_BUCKETS.VOICE_NOTES)
        .createSignedUrl(data.path, 60 * 60 * 24 * 365); // 1 year

      if (!signedError && signedData?.signedUrl) {
        return { url: signedData.signedUrl, error: null };
      }

      const { data: publicData } = supabase.storage
        .from(STORAGE_BUCKETS.VOICE_NOTES)
        .getPublicUrl(data.path);

      return { url: publicData.publicUrl, error: null };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Unknown audio upload error');
      console.error('Exception during voice note upload:', error);
      return { url: null, error };
    }
  },

  /**
   * Generate an on-demand signed URL for any private asset
   */
  async getSignedUrl(bucket: string, filePath: string, expiresIn = 60 * 60 * 24 * 7): Promise<string | null> {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filePath, expiresIn);
      return (!error && data?.signedUrl) ? data.signedUrl : null;
    } catch {
      return null;
    }
  }
};

import type {
  TimelineEvent,
  Memory,
  Letter,
  VoiceNote,
  PromiseItem,
  LittleThingItem,
  FutureDreamItem,
  ComfortContent,
  SiteSettings
} from '../types';

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 'timeline-1',
    date: '2025-09-19',
    displayDate: '19 September 2025',
    title: 'Where Our Paths First Crossed',
    description: 'A hospital visit where destiny had an unexpected plan. Laddu accidentally hit Juu during their very first encounter — a clumsy, unforgettable spark that started everything.',
    photoUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop',
    photoCaption: 'Placeholder Artistic Memory: Hospital Courtyard Moment',
    category: 'first_meet',
    location: 'Hospital Grounds',
    ladduEmotion: 'Startled, shy, and secretly memorable'
  },
  {
    id: 'timeline-2',
    date: '2025-10-04',
    displayDate: 'Early October 2025',
    title: 'The Conversations Began',
    description: 'What started as accidental became gradual daily conversations. Simple check-ins turned into late-night reflections, sharing little thoughts and feeling a rare comfort.',
    photoUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800&auto=format&fit=crop',
    photoCaption: 'Placeholder Artistic Memory: Words Floating In The Quiet Hours',
    category: 'growing_closer',
    location: 'Endless Phone Calls',
    ladduEmotion: 'Curious & warming up'
  },
  {
    id: 'timeline-3',
    date: '2025-11-15',
    displayDate: 'Mid November 2025',
    title: 'Words That Meant Something More',
    description: 'We started talking about real things — vulnerabilities, fears, family, dreams, and the kind of understanding we had both looked for. Silence was no longer awkward.',
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    photoCaption: 'Placeholder Artistic Memory: Calm Waves & Honest Truths',
    category: 'deep_conversations',
    location: 'Late Evenings',
    ladduEmotion: 'Heard & softly understood'
  },
  {
    id: 'timeline-4',
    date: '2025-12-28',
    displayDate: 'Late December 2025',
    title: 'Falling In Love Without Realizing When',
    description: 'There wasn’t just one big movie moment — it was the sum of so many small gestures, smiles, shared sighs, and realising you were the first person I wanted to tell everything to.',
    photoUrl: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=800&auto=format&fit=crop',
    photoCaption: 'Placeholder Artistic Memory: Midnight Lights & Soft Warmth',
    category: 'falling_in_love',
    location: 'In Every Thought',
    ladduEmotion: 'Precious, cherished & loved'
  },
  {
    id: 'timeline-5',
    date: '2026-02-14',
    displayDate: 'Present & Beyond',
    title: 'Through Memories, Support & Challenges',
    description: 'Learning how to love each other through both sweet days and stormy ones. Committing to listen, apologize, protect each other’s peace, and stand by your dreams.',
    photoUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    photoCaption: 'Placeholder Artistic Memory: Stars In Deep Navy Skies',
    category: 'milestone',
    location: 'Every Chapter Ahead',
    ladduEmotion: 'Grounded & hopeful'
  }
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'mem-1',
    title: 'The First Accidental Encounter',
    date: '2025-09-19',
    displayDate: '19 September 2025',
    location: 'Hospital Corridors',
    category: 'firsts',
    imageUrl: '/images/juu/7.jpeg',
    caption: 'Who would have known that accidentally hitting me would become the best accident of my life?',
    isPlaceholder: false,
    tags: ['First Meet', 'Destiny', 'Hospital']
  },
  {
    id: 'mem-2',
    title: 'Late Night Midnight Murmurs',
    date: '2025-10-24',
    displayDate: 'October 2025',
    location: 'Whispered Audio Calls',
    category: 'quiet_moments',
    imageUrl: '/images/juu/3.jpeg',
    caption: 'When sleep was secondary because listening to your voice talking about your day was the calmest place in the world.',
    isPlaceholder: false,
    tags: ['Night Calls', 'Voice', 'Comfort']
  },
  {
    id: 'mem-3',
    title: 'Your Shy Little Smile',
    date: '2025-11-10',
    displayDate: 'November 2025',
    location: 'A Fleeting Glance',
    category: 'candid',
    imageUrl: '/images/juu/4.jpeg',
    caption: 'That particular way you look down and smile when you are teased. It melts all the heavy noise of the world.',
    isPlaceholder: false,
    tags: ['Smile', 'Candid', 'Warmth']
  },
  {
    id: 'mem-4',
    title: 'Study Notes & Big Dreams',
    date: '2025-12-05',
    displayDate: 'December 2025',
    location: 'Desk Under Warm Lamp',
    category: 'special',
    imageUrl: '/images/juu/6.jpeg',
    caption: 'Watching how dedicated you are to your studies and your future. Never forget how smart, capable, and resilient you are.',
    isPlaceholder: false,
    tags: ['Dreams', 'Education', 'Pride']
  },
  {
    id: 'mem-5',
    title: 'A Breeze By The Water',
    date: '2026-01-14',
    displayDate: 'January 2026',
    location: 'Coastal Evening',
    category: 'travel',
    imageUrl: '/images/juu/1.jpeg',
    caption: 'Standing where the wind was cool and thinking about how much I want to make sure you always feel cherished and safe.',
    isPlaceholder: false,
    tags: ['Ocean', 'Breeze', 'Reassurance']
  },
  {
    id: 'mem-6',
    title: 'The Silly Inside Jokes',
    date: '2026-02-01',
    displayDate: 'February 2026',
    location: 'Every Random Chat',
    category: 'candid',
    imageUrl: '/images/juu/2.jpeg',
    caption: 'The way we laugh at things nobody else would ever understand. Those moments are pure gold.',
    isPlaceholder: false,
    tags: ['Laughter', 'Inside Jokes', 'Joy']
  }
];

export const INITIAL_LETTERS: Letter[] = [
  {
    id: 'let-1',
    slug: 'open-when-you-miss-me',
    title: 'Open When You Miss Me',
    subtitle: 'For when the distance feels a little too loud',
    triggerFeeling: 'Missing Juu',
    envelopeColor: '#C6A56B',
    previewExcerpt: 'If you close your eyes right now, imagine me holding your hands, reminding you that I am right here in your corner...',
    content: [
      'Hey my Laduuu,',
      'I know there are days when you wish I could just magically appear in front of you, pull a silly face to make you smile, or just sit quietly beside you so you do not have to say a single word.',
      'Whenever the distance or silence feels a little too heavy, I want you to remember that missing each other is simply proof of something real we share. But please do not let longing turn into loneliness or sadness.',
      'Close your eyes for three seconds. Take a slow, deep breath. I am thinking of you right now too, wishing you warmth and peace in your heart. You are carrying a piece of me with you everywhere you go.',
      'I am always rooting for you, proud of you, and waiting to hear your voice soon.'
    ],
    closing: 'Forever in your corner, Juu ❤️',
    isCustomizedByJuu: true
  },
  {
    id: 'let-2',
    slug: 'open-when-you-feel-alone',
    title: 'Open When You Feel Alone',
    subtitle: 'Even in an empty room, you are deeply cherished',
    triggerFeeling: 'Feeling Alone',
    envelopeColor: '#75485B',
    previewExcerpt: 'You are never as alone as your overthinking wants you to believe. Your feelings matter, and you are loved...',
    content: [
      'My dearest Laddu,',
      'It is easy for the mind to play tricks on us when darkness settles in, or when people around us seem busy with their own worlds. You might feel like nobody understands the weight you carry.',
      'I want you to know: your presence matters so much to me. The world is brighter, softer, and more meaningful because you are in it.',
      'Even when we are not actively talking, my care for you does not pause or switch off. It is steady, patient, and real.',
      'Put your hand over your heart. Feel that rhythm? That is life, resilience, and beauty. You are loved, you are valued, and you are never truly forgotten.'
    ],
    closing: 'Always beside you in spirit, Juu ❤️',
    isCustomizedByJuu: true
  },
  {
    id: 'let-3',
    slug: 'open-when-you-cry',
    title: 'Open When You Cry',
    subtitle: 'Tears are not weakness; they are feelings needing release',
    triggerFeeling: 'Tears & Sorrow',
    envelopeColor: '#202C40',
    previewExcerpt: 'Let it out, kutty. You do not have to hold everything in or pretend to be unbreakable...',
    content: [
      'Hey kutty,',
      'If tears are falling right now, please do not wipe them away in frustration or feel like you are being "too dramatic" or "too soft". Crying is just the heart’s way of breathing out when words aren’t enough.',
      'You carry so many expectations, thoughts, and worries on your shoulders. It is okay to put that heavy backpack down for a moment.',
      'If I were right there, I would not rush to say "stop crying". I would give you a tissue, sit by you, hold your hand gently, and let you cry until the storm passed.',
      'Drink a glass of water after reading this. Wash your face with cool water. You are going to be okay, one slow breath at a time.'
    ],
    closing: 'With all my gentleness, Juu ❤️',
    isCustomizedByJuu: true
  },
  {
    id: 'let-4',
    slug: 'open-when-you-doubt-yourself',
    title: 'Open When You Doubt Yourself',
    subtitle: 'A reminder of the strength and brilliance inside you',
    triggerFeeling: 'Self-Doubt & Insecurity',
    envelopeColor: '#C6A56B',
    previewExcerpt: 'Look at how far you have already come. Don’t let a temporary stumble erase your incredible capabilities...',
    content: [
      'Laduuu,',
      'Pause right there. Stop the harsh voice in your head that is comparing you to others or telling you that you are not capable or smart enough.',
      'I see how diligently you work. I see the quiet courage you bring to your studies, your goals, and the challenges life throws at you. You have walked through difficult days before, and you came out stronger every single time.',
      'Doubt is just a visitor; it is not the truth about who you are. Your potential is immense, your mind is bright, and your heart is sincere.',
      'Believe in yourself the way I believe in you. Lift your chin up. You’ve got this.'
    ],
    closing: 'Your biggest fan, Juu ❤️',
    isCustomizedByJuu: true
  },
  {
    id: 'let-5',
    slug: 'open-when-you-are-stressed',
    title: 'Open When You Are Stressed',
    subtitle: 'Everything does not need to be solved in this single hour',
    triggerFeeling: 'Stress & Overwhelm',
    envelopeColor: '#182338',
    previewExcerpt: 'Drop your shoulders away from your ears. Unclench your jaw. Breathe in for four seconds...',
    content: [
      'Hey my hardworking Laddu,',
      'Notice where your tension is right now: are your shoulders hunched? Is your jaw clenched? Let them relax right this second.',
      'Whatever deadline, exam, assignment, or family tension is piling up — remember that life happens in small steps, not all at once. You do not have to solve the next five years of your life tonight.',
      'Break it down into just the next single task. If even that is too much, take a 15-minute break. Make a warm cup of something you like, listen to a calming song, and reset.',
      'Your mental peace and well-being will always matter more than rushing perfection.'
    ],
    closing: 'Breathe easy, Juu ❤️',
    isCustomizedByJuu: true
  },
  {
    id: 'let-6',
    slug: 'open-when-you-cannot-sleep',
    title: 'Open When You Cannot Sleep',
    subtitle: 'Rest your thoughts under this midnight sky',
    triggerFeeling: 'Sleepless Nights',
    envelopeColor: '#101725',
    previewExcerpt: 'The night is not an interrogation room. Put the worries on pause until morning lights arrive...',
    content: [
      'Hey sleep-resistant girl,',
      'It is late, the world is quiet, and yet your thoughts are running a marathon. I know the feeling all too well.',
      'I want you to make an agreement with yourself: whatever you are worrying about right now cannot be resolved at 2:00 AM. It will still be there tomorrow, but you will handle it ten times better with rest.',
      'Put your phone aside on dim mode. Close your eyes. Picture a calm ocean shore under a navy sky with gentle waves washing up on smooth sand. The breeze is cool and quiet.',
      'Rest your mind, Laddu. Sleep gently. I will see you in the morning.'
    ],
    closing: 'Goodnight sweet dreams, Juu ❤️',
    isCustomizedByJuu: true
  },
  {
    id: 'let-7',
    slug: 'open-when-you-achieve-something',
    title: 'Open When You Achieve Something',
    subtitle: 'Celebrate yourself! I am celebrating you from the bottom of my heart',
    triggerFeeling: 'Success & Celebration',
    envelopeColor: '#C6A56B',
    previewExcerpt: 'YES! I knew you could do it! Take a victory dance and soak in your hard-earned pride...',
    content: [
      'YAYYY! MY PROUD LADUUU!',
      'Whether this is an exam result, a completed project, a personal breakthrough, or simply surviving a week that demanded everything from you — CELEBRATE!',
      'You worked for this. You put in the quiet hours when nobody was watching. Do not downplay your achievement or say "it was just luck". It was your effort, your focus, and your talent.',
      'I am smiling so wide right now thinking of how happy and relieved you must feel. Treat yourself to your favorite snack today.',
      'I am endlessly proud to know you and watch you flourish.'
    ],
    closing: 'Cheering the loudest for you, Juu 🎉❤️',
    isCustomizedByJuu: true
  },
  {
    id: 'let-8',
    slug: 'open-when-you-need-a-hug',
    title: 'Open When You Need a Hug',
    subtitle: 'Wrap yourself in this warm blanket of reassurance',
    triggerFeeling: 'Craving Warmth & Comfort',
    envelopeColor: '#75485B',
    previewExcerpt: 'Wrap your arms around yourself, squeeze tight, and imagine the warmest hug from me...',
    content: [
      'Hey my soft kutty,',
      'Sometimes words aren’t what we need — we just need that warm, safe physical embrace that lets us melt away our defenses.',
      'Since I cannot wrap my arms around you in person right this moment, pull your blanket up tight, tuck your knees in, and let this letter be a gentle proxy.',
      'Imagine me resting my chin lightly on your head, saying: "You are doing fine. You are safe. You are cared for."',
      'Hold onto this warmth. You are precious beyond measure.'
    ],
    closing: 'A long, tight warm hug, Juu ❤️',
    isCustomizedByJuu: true
  },
  {
    id: 'let-9',
    slug: 'open-when-you-are-angry-with-me',
    title: 'Open When You Are Angry With Me',
    subtitle: 'When I have hurt you or made a mistake — I am listening',
    triggerFeeling: 'Anger & Frustration with Juu',
    envelopeColor: '#202C40',
    previewExcerpt: 'Your anger is valid. I do not want to defend my ego — I want to understand your hurt and make it right...',
    content: [
      'Laddu,',
      'If you are reading this because I upset you, said something insensitive, or failed to be the partner you deserved in an argument — please read this with an open heart.',
      'I am not writing this to dismiss your feelings or explain away my mistakes. Your hurt is completely valid. If I caused you pain, I am genuinely sorry.',
      'I promise you that I never want our arguments to turn into threats of leaving, cutting communication, or making you feel small. I want us to be a team that talks through differences, even when it is uncomfortable.',
      'Take all the space you need to cool down. When you are ready, please tell me what you felt. I am ready to listen, learn, and do better.'
    ],
    closing: 'Humbly committed to getting it right, Juu',
    isCustomizedByJuu: true
  },
  {
    id: 'let-10',
    slug: 'open-when-you-need-to-remember-how-special-you-are',
    title: 'Open When You Need to Remember How Special You Are',
    subtitle: 'Never forget the rare light you carry into this world',
    triggerFeeling: 'Lost Sense of Worth',
    envelopeColor: '#C6A56B',
    previewExcerpt: 'In a world of billions of people, there is nobody with your exact heart, kindness, and spark...',
    content: [
      'My dearest Laduuu,',
      'If you ever start feeling ordinary, replaceable, or invisible, I want to stand in front of you and be your mirror.',
      'You are special not because of superficial things, but because of who you are at your core: your sensitivity, the way you care deeply for people, your genuine laughter, your sharp wit, and your beautiful resilience.',
      'Meeting you was not just a lucky date on a calendar; it changed how I see sincerity and care. You make ordinary moments feel like memories worth keeping forever.',
      'Never shrink yourself to fit into smaller spaces. Shine proudly, kutty. You are one in an infinite galaxy.'
    ],
    closing: 'Admiring you always, Juu ❤️',
    isCustomizedByJuu: true
  }
];

export const INITIAL_VOICE_NOTES: VoiceNote[] = [
  {
    id: 'voice-1',
    title: 'A Little Reassurance For Today',
    category: 'reassurance',
    categoryLabel: 'A Little Reassurance',
    duration: '02:18',
    durationSeconds: 138,
    caption: 'When your thoughts feel like a heavy cloud, press play and let me remind you of your quiet strength.',
    isPlaceholder: true,
    syntheticVoiceType: 'warm_reassurance'
  },
  {
    id: 'voice-2',
    title: 'When You Miss My Voice',
    category: 'miss_me',
    categoryLabel: 'When You Miss Me',
    duration: '01:45',
    durationSeconds: 105,
    caption: 'A gentle message recorded just for those quiet evenings when you wish I was sitting across from you.',
    isPlaceholder: true,
    syntheticVoiceType: 'gentle_whisper'
  },
  {
    id: 'voice-3',
    title: 'For When You Feel Low or Overwhelmed',
    category: 'feel_low',
    categoryLabel: 'When You Feel Low',
    duration: '03:02',
    durationSeconds: 182,
    caption: 'Take a breath with me. We will take this hour by hour, without rush and without fear.',
    isPlaceholder: true,
    syntheticVoiceType: 'calm_presence'
  },
  {
    id: 'voice-4',
    title: 'A Silly Reminder to Make You Smile',
    category: 'make_smile',
    categoryLabel: 'When I Want to Make You Smile',
    duration: '01:20',
    durationSeconds: 80,
    caption: 'A playful check-in to tease that grumpy pout off your face and bring out your real smile.',
    isPlaceholder: true,
    syntheticVoiceType: 'warm_reassurance'
  },
  {
    id: 'voice-5',
    title: 'Just a Random Midday Note from Juu',
    category: 'random',
    categoryLabel: 'Random Message from Juu',
    duration: '01:50',
    durationSeconds: 110,
    caption: 'No special reason — just checking if my Laduuu had her meal, drank water, and didn’t stress too much.',
    isPlaceholder: true,
    syntheticVoiceType: 'gentle_whisper'
  }
];

export const INITIAL_PROMISES: PromiseItem[] = [
  {
    id: 'prom-1',
    title: 'Listening Instead of Assuming',
    summary: 'Choosing patience over hasty conclusions.',
    detail: 'I commit to asking questions and genuinely seeking to understand your perspective before forming a judgment or reacting in defensiveness.',
    category: 'communication',
    isApprovedByJuu: true
  },
  {
    id: 'prom-2',
    title: 'Communicating Instead of Threatening to Leave',
    summary: 'Standing firm in commitment during stormy moments.',
    detail: 'Disagreements happen, but our foundation should never be called into question. I promise to work through issues rather than threatening detachment.',
    category: 'communication',
    isApprovedByJuu: true
  },
  {
    id: 'prom-3',
    title: 'No Blocking or App Uninstall Threats',
    summary: 'Eliminating fear tactics from our conflict resolution.',
    detail: 'I will never use blocking, uninstalling apps, or vanishing as a weapon or threat during arguments. Respectful boundaries over emotional leverage, always.',
    category: 'consistency',
    isApprovedByJuu: true
  },
  {
    id: 'prom-4',
    title: 'Giving Time to Calm Down Without Abandonment',
    summary: 'Space with assurance, never cold silence.',
    detail: 'If either of us feels overwhelmed, we will pause respectfully with clear reassurance: "I love you, I need 20 minutes to breathe, and I am coming right back to talk."',
    category: 'patience',
    isApprovedByJuu: true
  },
  {
    id: 'prom-5',
    title: 'Discussing Difficult Feelings Respectfully',
    summary: 'Creating a safe harbor where honesty is never punished.',
    detail: 'You will never have to bottle up your hurt or fear that speaking your mind will cause a fight. Your feelings will be heard with dignity.',
    category: 'communication',
    isApprovedByJuu: true
  },
  {
    id: 'prom-6',
    title: 'Prioritizing Quality Time Together',
    summary: 'Intentional presence in a busy world.',
    detail: 'Making sure that busyness does not crowd out our connection. Setting aside real, unhurried time where you have my full undivided attention.',
    category: 'consistency',
    isApprovedByJuu: true
  },
  {
    id: 'prom-7',
    title: 'Championing Your Education & Dreams',
    summary: 'Your ambitions are sacred to me.',
    detail: 'Supporting your studies, encouraging your professional ambitions, and never making you feel like your personal growth takes a backseat.',
    category: 'dreams_support',
    isApprovedByJuu: true
  },
  {
    id: 'prom-8',
    title: 'Consistency Through Actions, Not Just Words',
    summary: 'Showing up reliably every single day.',
    detail: 'Promises mean nothing without daily reliability. I will demonstrate my care through how I treat you, how I listen, and how I follow through.',
    category: 'consistency',
    isApprovedByJuu: true
  },
  {
    id: 'prom-diff-1',
    title: 'Accountability: The Beach Night Ride',
    summary: 'Acknowledging the hurt of "neeye poiko" and choosing true safety.',
    detail: 'I deeply regret that night when frustration took over and I said words that made you feel deserted, unwanted, or unsafe. You deserved protection, warmth, and steady companionship, not harsh words that left you questioning your place. I acknowledge that pain and promise never to let anger make you feel abandoned.',
    category: 'accountability',
    isAccountabilityNote: true,
    incidentTitle: 'The Beach Night Ride Incident',
    ladduFeelingAcknowledged: 'Feeling discarded, unsafe, unwanted, and hurt by cold words in a vulnerable moment.',
    juuCommitment: 'To always be your safe protector, to never utter words of abandonment in heat, and to ensure you always know you are wanted and cherished.',
    isApprovedByJuu: true
  },
  {
    id: 'prom-diff-2',
    title: 'Accountability: The Threat to End Communication',
    summary: 'Acknowledging the threat of stopping talks and uninstalling apps.',
    detail: 'During that argument, threatening to disconnect, cut communication, and uninstall apps was an unhealthy emotional reaction that hurt you deeply. You do not deserve to walk on eggshells or fear that expressing feelings will lead to sudden silence. I take full responsibility for that behavior and commit to open, mature dialogue.',
    category: 'accountability',
    isAccountabilityNote: true,
    incidentTitle: 'The Argument Threatening Cut-Off & Uninstallation',
    ladduFeelingAcknowledged: 'Fear of sudden loss, emotional invalidation, anxiety over communication withdrawal.',
    juuCommitment: 'To keep communication open, never use vanishing as an emotional lever, and work through disagreements with calm maturity.',
    isApprovedByJuu: true
  }
];

export const INITIAL_LITTLE_THINGS: LittleThingItem[] = [
  {
    id: 'thing-1',
    category: 'nicknames',
    title: 'My Favorite Names For You',
    description: 'Laduuu, Kutty, muu,Thango,Venna,Chellakutyyy.',
    icon: 'Sparkles',
    tag: 'Sweet & Playful'
  },
  {
    id: 'thing-2',
    category: 'about_laddu',
    title: 'Things Juu Adores About Laddu',
    description: 'The genuine sparkle in your eyes when you talk about things you love, your sharp intuition, your laugh that lights up any room, and your hidden soft heart.',
    icon: 'Heart',
    tag: 'Cherished'
  },
  {
    id: 'thing-3',
    category: 'food',
    title: 'Food We Crave Together',
    description: 'Midnight snacks, warm crispy dosas, sweet cravings when stressed, and debating what to order for 45 minutes.',
    icon: 'Coffee',
    tag: 'Daily Cravings'
  },
  {
    id: 'thing-4',
    category: 'songs',
    title: 'Melodies That Remind Me of Us',
    description: 'Quiet acoustic tunes, soulful midnight melodies, and songs that feel like slow breeze on a quiet drive.',
    icon: 'Music',
    tag: 'Soundtrack'
  },
  {
    id: 'thing-5',
    category: 'habits',
    title: "Juu's Favourite Ways to Annoy Laddu 😂❤️",
    description: 'Constantly pulling her leg, teasing her for no reason, irritating her just to see her cute angry face, making silly jokes at the wrong time, and never missing a chance to make her say, "JUUUUU! 😤"',
    icon: 'Smile',
    tag: 'Honest Truth'
  },
  {
    id: 'thing-6',
    category: 'jokes',
    title: 'Our Unspoken Hospital Joke',
    description: 'Who knew hitting someone at a hospital would lead to a lifetime of "See? You attacked me first!" debates?',
    icon: 'Zap',
    tag: 'First Meet'
  },
  {
    id: 'thing-7',
    category: 'favorites',
    title: 'Juu’s Favorite Moment of the Day',
    description: 'That exact moment in the evening when both our works are done, phones connect, and you say: "Hey Juu..."',
    icon: 'Moon',
    tag: 'Pure Peace'
  },
  {
    id: 'thing-8',
    category: 'facts',
    title: 'A Truth Juu Keeps in Heart',
    description: 'No matter how chaotic the week gets, knowing I get to be in your corner makes everything worthwhile.',
    icon: 'Shield',
    tag: 'Unfiltered'
  }
];

export const INITIAL_FUTURE_DREAMS: FutureDreamItem[] = [
  {
    id: 'dream-1',
    title: 'A Peaceful Beach Night Ride (Done Right)',
    description: 'Cool sea breeze, slow quiet ride, stopping by the calm waves to hold hands under the stars, feeling safe, cherished, and completely at peace together.',
    location: 'Coastal Shoreline',
    status: 'planned',
    category: 'peace',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dream-2',
    title: 'Watching a Golden Sunset Together',
    description: 'Sitting side by side on a quiet hill or seaside, watching the golden sky turn into deep navy without any rush to go anywhere.',
    location: 'Horizon Viewpoint',
    status: 'dreaming',
    category: 'quiet_days',
    imageUrl: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dream-3',
    title: 'Celebrating Your Graduation & Achievements',
    description: 'Standing proudly in the crowd, cheering for you the loudest as you hold your degree and take big confident steps toward your dreams.',
    location: 'Your Convocation Hall',
    status: 'holding_close',
    category: 'celebration',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dream-4',
    title: 'Exploring an Unfamiliar Cozy Town',
    description: 'Walking through quiet stone streets, finding little cafés, trying strange desserts, and laughing as we get delightfully lost together.',
    location: 'Hills or Historic Town',
    status: 'dreaming',
    category: 'adventure',
    imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dream-5',
    title: 'A Whole Day With Zero Rush',
    description: 'No alarms, no urgent calls, cooking together (or laughing at our burnt toast), watching favorite movies curled up in warm blankets.',
    location: 'Our Cozy Sanctuary',
    status: 'planned',
    category: 'quiet_days',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
  }
];

export const INITIAL_COMFORT_CONTENT: ComfortContent = {
  greeting: 'Hey, my Ladu...',
  mainMessage: [
    'Take a little breath.',
    'You don\'t have to solve everything right now.',
    'You don\'t have to pretend to be okay.',
    'Your feelings matter.',
    'Your dreams matter.',
    'And you deserve love that makes you feel safe, heard and valued.',
    'If I could be beside you right now, I would want to listen first, hold your hand and remind you how precious you are.',
    'Take your time, kutty. One moment at a time.'
  ],
  breathingGuidance: 'Inhale gently for 4 seconds... Hold softly for 4... Exhale peacefully for 4...',
  reassurances: [
    'You do not have to carry the whole world today.',
    'It is okay to rest and let things pause.',
    'Your worth is not tied to your productivity or bad moods.',
    'I am listening, whenever you are ready to talk.',
    'You are safe here.'
  ],
  reminderPoints: [
    'Drink a sip of water.',
    'Relax your forehead and jaw.',
    'Wrap yourself in your favorite blanket.',
    'Remember: difficult days do not define your whole life.'
  ]
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  isEntered: false,
  entrancePassphraseHint: 'laddu',
  heroTitle: 'Hey, my Laduuu...',
  heroSubtitle: 'Whenever You Need Me ❤️',
  welcomeMessage: 'If today feels a little heavy, stay here for a moment. This little world holds pieces of our story, my voice, our memories and everything I want you to remember.',
  bgMusicEnabled: false,
  lastUpdated: new Date().toISOString()
};

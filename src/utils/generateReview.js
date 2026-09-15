// ── Review generation ────────────────────────────────────────────────────
// generateReview() is the single entry point the UI calls. It currently
// builds a natural-sounding review locally (no network, no API key needed).
//
// To connect a real AI model, replace the body of generateReview() with a
// call to your backend/API — see the commented example at the bottom of
// this file — and keep the same function signature so the UI needs no
// changes.


// ── Review generation ────────────────────────────────────────────────────
// Temporary local review generator.
// This will later be replaced with the Gemini API.

const RATING_STYLES = {
  1: {
    openers: [
      'Unfortunately, my experience here was disappointing.',
      'I was disappointed with my overall experience.',
      'My experience did not meet my expectations.',
    ],
    closers: [
      'I hope the issues are addressed in the future.',
      'There is definitely room for improvement.',
      'I hope the experience improves going forward.',
    ],
  },

  2: {
    openers: [
      'The experience was okay, but it could have been better.',
      'My experience was somewhat below expectations.',
      'It was an average experience overall.',
    ],
    closers: [
      'A few improvements could make a big difference.',
      'I hope the experience improves next time.',
      'There is some room for improvement.',
    ],
  },

  3: {
    openers: [
      'Overall, I had a nice experience.',
      'I had a decent experience overall.',
      'It was a good experience, overall satisfactory.',
    ],
    closers: [
      'Overall, it was a pleasant experience.',
      'A decent experience that delivered well',
      'I would consider visiting again.',
    ],
  },

  4: {
    openers: [
      'I had a very good experience here.',
      'Really enjoyed my overall experience.',
      'Had a great experience overall.',
    ],
    closers: [
      'Overall, a very enjoyable experience.',
      'I would be happy to visit again.',
      'Definitely a place worth visiting.',
    ],
  },

  5: {
    openers: [
      'Absolutely loved my experience here.',
      'Had an excellent experience from start to finish.',
      'Really impressed with the overall experience.',
    ],
    closers: [
      'I would definitely recommend this place to others.',
      'Highly recommend it to anyone looking for a great experience.',
      'Would definitely recommend and visit again.',
    ],
  },
}

const TAG_PHRASES = {
  Food: [
    'the food was delicious',
    'really enjoyed the food',
    'the food was a highlight of the experience',
  ],

  Taste: [
    'the taste was excellent',
    'really enjoyed the flavours',
    'the flavours stood out',
  ],

  Service: [
    'the service was smooth and attentive',
    'the service was handled well',
    'the service was pleasant',
  ],

  Staff: [
    'the staff were friendly and welcoming',
    'the staff were courteous',
    'the team was warm and helpful',
  ],

  Ambience: [
    'the ambience was pleasant',
    'really enjoyed the atmosphere',
    'the overall vibe was enjoyable',
  ],

  Cleanliness: [
    'the place was clean and well maintained',
    'the cleanliness was impressive',
    'everything felt clean and well kept',
  ],

  'Portion size': [
    'the portion size was satisfying',
    'the portions were quite good',
    'the portion size felt generous',
  ],

  'Value for money': [
    'it offered good value for money',
    'the overall value was good',
    'it felt reasonably priced for the experience',
  ],

  Pizza: [
    'the pizza was delicious',
    'really enjoyed the pizza',
    'the pizza was one of the highlights',
  ],

  'Food quality': [
    'the food quality was good',
    'the quality of the food stood out',
    'the food felt fresh and well prepared',
  ],

  Coffee: [
    'the coffee was enjoyable',
    'really liked the coffee',
    'the coffee was a highlight',
  ],

  Desserts: [
    'the desserts were enjoyable',
    'really liked the desserts',
    'the desserts were a nice highlight',
  ],

  Equipment: [
    'the equipment was well maintained',
    'the equipment was good and useful',
    'there was a good range of equipment',
  ],

  Trainers: [
    'the trainers were helpful',
    'the trainers were supportive',
    'the training team was approachable',
  ],

  'Personal training': [
    'the personal training experience was good',
    'the personal training was helpful',
    'the personal training sessions were well handled',
  ],

  'Group classes': [
    'the group classes were enjoyable',
    'the group classes were well organised',
    'I enjoyed the group class experience',
  ],

  Facilities: [
    'the facilities were well maintained',
    'the facilities were convenient',
    'the facilities were good overall',
  ],
  Packaging: [
  'the packaging was secure and well presented',
  'the packaging was neat and kept everything intact',
  'the food was packed carefully and arrived in good condition',
],
Presentation: [
  'the presentation was neat and appealing',
  'the food was presented nicely',
  'the overall presentation was well done',
],

'Delivery time': [
  'the delivery time was good',
  'the order arrived within a reasonable time',
  'the delivery was handled efficiently',
],
Hygiene: [
  'the overall hygiene was good',
  'the food and packaging felt clean and hygienic',
  'the attention to hygiene was reassuring',
],
}

const COMPLIMENTS = {
  Food: [
    'The flavours were especially memorable.',
    'The food was a particularly nice highlight.',
  ],

  Taste: [
    'The flavours were especially well balanced.',
    'The taste really stood out.',
  ],

  Service: [
    'The service made the experience feel especially smooth.',
    'The attentive service was a nice touch.',
  ],

  Staff: [
    'The welcoming staff made the visit more enjoyable.',
    'The friendly team added a nice personal touch.',
  ],

  Ambience: [
    'The atmosphere made the visit feel especially relaxing.',
    'The ambience added a lovely touch to the experience.',
  ],

  Cleanliness: [
    'The attention to cleanliness was particularly impressive.',
    'It was nice to see the place so well maintained.',
  ],

  Equipment: [
    'The well-maintained equipment was a real plus.',
    'The equipment made the overall experience more enjoyable.',
  ],

  Trainers: [
    'The supportive trainers were a real highlight.',
    'The trainers added a very positive touch to the experience.',
  ],

  Coffee: [
    'The coffee was particularly enjoyable.',
    'The quality of the coffee really stood out.',
  ],

  Pizza: [
    'The pizza was definitely a highlight.',
    'The pizza made the experience even better.',
  ],
}
const NOTE_SENTENCES = {
  1: {
    noun: [
      'The {note} was not good.',
      'The {note} was disappointing.',
      'The {note} did not meet my expectations.',
      'The {note} could have been much better.',
      'I was not happy with the {note}.',
    ],
    verb: [
      '{note} was not a good experience.',
      '{note} was handled poorly.',
      '{note} could have been handled much better.',
      '{note} did not go as expected.',
      'I was disappointed with how {note} was handled.',
    ],
  },

  2: {
    noun: [
      'The {note} was okay, but could have been better.',
      'The {note} was not quite up to the mark.',
      'The {note} lacked a little in execution.',
      'The {note} had some room for improvement.',
      'I felt the {note} could have been better.',
    ],
    verb: [
      '{note} was okay, but could have been better.',
      '{note} did not quite meet expectations.',
      '{note} could have been handled better.',
      '{note} was decent, but lacked a little.',
      'I felt {note} could have been better.',
    ],
  },

  3: {
    noun: [
      'The {note} was nice and added to the experience.',
      'The {note} was good overall.',
      'The {note} was decent and met expectations.',
      'The {note} was fairly good.',
      'The {note} landed well overall.',
    ],
    verb: [
      '{note} was a nice part of the experience.',
      '{note} went well overall.',
      '{note} was handled well.',
      '{note} was good and met expectations.',
      'I felt {note} went pretty well.',
    ],
  },

  4: {
    noun: [
      'The {note} was great and exceeded my expectations.',
      'The {note} was really well done.',
      'The {note} stood out in a positive way.',
      'The {note} was better than I expected.',
      'I was genuinely impressed with the {note}.',
    ],
    verb: [
      '{note} was handled really well.',
      '{note} went better than expected.',
      '{note} was a great part of the experience.',
      '{note} exceeded my expectations.',
      'I was really impressed with how {note} was handled.',
    ],
  },

  5: {
    noun: [
      'The {note} was awesome and exceeded my expectations.',
      'The {note} was excellent and really stood out.',
      'The {note} was absolutely fantastic.',
      'The {note} was one of the best parts of the experience.',
      'I was extremely impressed with the {note}.',
    ],
    verb: [
      '{note} was handled exceptionally well.',
      '{note} was an excellent part of the experience.',
      '{note} went perfectly.',
      '{note} was fantastic from start to finish.',
      'I was extremely impressed with how {note} was handled.',
    ],
  },
}
function buildNoteSentence(note, rating, variant = 0) {
  const cleanNote = note?.trim()

  if (!cleanNote) return ''

  // Common action/verb phrases.
  const verbPattern =
    /^(waiting|ordering|booking|dining|eating|shopping|parking|checking|paying|calling|dealing|interacting|communicating|serving|delivering|receiving|using|handling)\b/i

  const type = verbPattern.test(cleanNote) ? 'verb' : 'noun'

  const templates =
    NOTE_SENTENCES[rating]?.[type] || NOTE_SENTENCES[3].noun

  const template = templates[variant % templates.length]

  return template.replace('{note}', cleanNote)
}

function pick(arr, seed = 0) {
  if (!arr || arr.length === 0) return ''
  return arr[seed % arr.length]
}

function joinPhrases(phrases) {
  if (phrases.length === 0) return ''

  if (phrases.length === 1) {
    return phrases[0]
  }

  if (phrases.length === 2) {
    return `${phrases[0]} and ${phrases[1]}`
  }

  return `${phrases.slice(0, -1).join(', ')}, and ${phrases[phrases.length - 1]}`
}

/**
 * Builds a review from customer input.
 *
 * @param {{
 *   rating: number,
 *   tags: string[],
 *   note: string,
 *   variant?: number,
 *   business?: object
 * }} input
 * @returns {Promise<string>}
 */
export async function generateReview({
  rating,
  tags,
  note,
  variant = 0,
  business: businessConfig,
}) {
  // Simulate brief thinking time.
  await new Promise((resolve) => setTimeout(resolve, 650))

  const style = RATING_STYLES[rating] || RATING_STYLES[3]

  const opener = pick(style.openers, variant)

  // Only use keywords that belong to this specific client.
  const validTags = tags.filter(
    (tag) =>
      TAG_PHRASES[tag] &&
      businessConfig?.keywords?.includes(tag)
  )

  // Use a maximum of 3 selected keywords so the review stays natural.
  const phrases = validTags
    .slice(0, 3)
    .map((tag, index) =>
      pick(TAG_PHRASES[tag], variant + index)
    )
    .filter(Boolean)

  const middle = phrases.length
    ? `${joinPhrases(phrases)}.`
    : ''

  // 4 and 5 star reviews get one compliment related to a selected keyword.
  let compliment = ''

  if (rating >= 4 && validTags.length > 0) {
    const complimentTag =
      validTags[variant % validTags.length]

    compliment = pick(
      COMPLIMENTS[complimentTag] || [],
      variant
    )
  }

 const noteSentence = buildNoteSentence(
  note,
  rating,
  variant
)

  const closer = pick(
    style.closers,
    variant + 1
  )

  const sentences = [
  opener,
  middle,
  compliment,
  noteSentence,
  closer,
].filter(Boolean)

  return sentences
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

 

/* ───────────────────────────────────────────────────────────────────────
   CONNECT A REAL AI API HERE
   Replace the function body above with something like:

   export async function generateReview({ rating, tags, note }) {
     const response = await fetch('/api/generate-review', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ rating, tags, note }),
     })
     if (!response.ok) throw new Error('Failed to generate review')
     const data = await response.json()
     return data.review
   }

   Keep the backend call server-side so no API key is ever exposed
   in the browser bundle.
   ─────────────────────────────────────────────────────────────────────── */

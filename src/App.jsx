import { useEffect, useRef, useState } from 'react'
import BusinessHeader from './components/BusinessHeader.jsx'
import StarRating from './components/StarRating.jsx'
import ExperienceTags from './components/ExperienceTags.jsx'
import OptionalNote from './components/OptionalNote.jsx'
import GenerateButton from './components/GenerateButton.jsx'
import ReviewResult from './components/ReviewResult.jsx'
import { generateReview } from './utils/generateReview.js'
import { clients } from './clients.js'

export default function App() {
  // Get the client ID from the URL
  const clientId =
    new URLSearchParams(window.location.search).get('client') ||
    'spicekitchen'

  // Find that client's configuration
  const businessConfig = clients[clientId] || clients.spicekitchen

  const [rating, setRating] = useState(0)
  const [tags, setTags] = useState([])
  const [note, setNote] = useState('')

  const [reviews, setReviews] = useState([])

  const [status, setStatus] = useState('idle')
  const [selectedReview, setSelectedReview] = useState(0)

  const resultRef = useRef(null)

  useEffect(() => {
    if (status === 'done' && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [status])

  function toggleTag(tag) {
    setTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    )
  }

  async function handleGenerate() {
    setStatus('loading')
    setSelectedReview(0)

    try {
      const generatedReviews = []

      for (let variant = 0; variant < 5; variant++) {
        const text = await generateReview({
          rating,
          tags,
          note,
          variant,
          business: businessConfig,
        })

        generatedReviews.push(text)
      }

      setReviews(generatedReviews)
      setStatus('done')
    } catch (error) {
      console.error('Review generation failed:', error)
      setStatus('idle')
    }
  }

  async function handleRegenerate() {
    setStatus('loading')
    setSelectedReview(0)

    try {
      const generatedReviews = []

      for (let variant = 0; variant < 5; variant++) {
        const text = await generateReview({
          rating,
          tags,
          note,
          variant,
          business: businessConfig,
        })

        generatedReviews.push(text)
      }

      setReviews(generatedReviews)
      setStatus('done')
    } catch (error) {
      console.error('Review regeneration failed:', error)
      setStatus('done')
    }
  }

  function handleReviewChange(index, value) {
    setReviews((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  function handleCopyAndReview() {
    window.open(
      businessConfig.googleReviewUrl,
      '_blank',
      'noopener,noreferrer'
    )
  }

  function handleStartOver() {
    setStatus('idle')
    setRating(0)
    setTags([])
    setNote('')
    setReviews([])
    setSelectedReview(0)
  }

  return (
    <div className="min-h-dvh bg-surface-soft sm:flex sm:items-center sm:justify-center sm:py-8">
      <div className="mx-auto w-full sm:max-w-[440px] sm:rounded-[28px] sm:shadow-pop bg-surface-soft sm:bg-white min-h-dvh sm:min-h-0 sm:my-auto flex flex-col">

        <main
          className="flex-1 px-4 pt-5 space-y-6"
          style={{
            paddingBottom:
              status === 'idle' || status === 'loading'
                ? '0'
                : '1.5rem',
          }}
        >

          <BusinessHeader
            name={businessConfig.name}
            tagline={businessConfig.tagline}
            logoUrl={businessConfig.logoUrl}
          />

          <StarRating
            rating={rating}
            onChange={setRating}
          />

          {/* Keywords stay visible after AI generation */}
          {rating > 0 && (
            <div className="space-y-5">
              <ExperienceTags
               tags={businessConfig.keywords}
               selected={tags}
              onToggle={toggleTag}
              />

              <OptionalNote
                value={note}
                onChange={setNote}
              />
            </div>
          )}

          {/* Five AI reviews */}
          {reviews.length > 0 && (
            <div ref={resultRef}>
              <ReviewResult
                reviews={reviews}
                selectedReview={selectedReview}
                onSelect={setSelectedReview}
                onChange={handleReviewChange}
                onRegenerate={handleRegenerate}
                regenerating={status === 'loading'}
                onCopyAndReview={handleCopyAndReview}
              />

              <button
                type="button"
                onClick={handleStartOver}
                className="mt-4 w-full text-center text-[13px] font-medium text-ink-faint h-8"
              >
                Start over
              </button>
            </div>
          )}

        </main>

        {rating > 0 && reviews.length === 0 && (
          <div
            className="sticky bottom-0 px-4 pt-3 bg-gradient-to-t from-surface-soft sm:from-white via-surface-soft sm:via-white to-transparent"
            style={{
              paddingBottom:
                'calc(env(safe-area-inset-bottom) + 1rem)',
            }}
          >
            <GenerateButton
              onClick={handleGenerate}
              loading={status === 'loading'}
              disabled={rating === 0}
            />
          </div>
        )}

        {rating === 0 && (
          <div
            className="h-4"
            style={{
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          />
        )}

      </div>
    </div>
  )
}
import { useEffect, useRef, useState } from 'react'

export default function ReviewResult({
  reviews,
  selectedReview,
  onSelect,
  onChange,
  onRegenerate,
  regenerating,
  onCopyAndReview,
}) {
  const [editing, setEditing] = useState(false)
  const [copyState, setCopyState] = useState('idle')
  const textareaRef = useRef(null)

  const review = reviews[selectedReview] || ''

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus()

      const len = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(len, len)
    }
  }, [editing])

  useEffect(() => {
    if (copyState === 'idle') return

    const timer = setTimeout(() => {
      setCopyState('idle')
    }, 2200)

    return () => clearTimeout(timer)
  }, [copyState])

  function goPrevious() {
    setEditing(false)

    onSelect(
      selectedReview === 0
        ? reviews.length - 1
        : selectedReview - 1
    )
  }

  function goNext() {
    setEditing(false)

    onSelect(
      selectedReview === reviews.length - 1
        ? 0
        : selectedReview + 1
    )
  }

  async function handleCopyAndReview() {
    let copied = false

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(review)
        copied = true
      } else {
        throw new Error('Clipboard API unavailable')
      }
    } catch {
      try {
        const el =
          textareaRef.current ||
          document.createElement('textarea')

        const isTemp = !textareaRef.current

        if (isTemp) {
          el.value = review
          el.style.position = 'fixed'
          el.style.opacity = '0'
          document.body.appendChild(el)
        }

        el.focus()
        el.select()

        copied = document.execCommand('copy')

        if (isTemp) {
          document.body.removeChild(el)
        }
      } catch {
        copied = false
      }
    }

    setCopyState(copied ? 'copied' : 'failed')

    onCopyAndReview()
  }

  return (
    <section
      aria-labelledby="result-heading"
      className="animate-riseIn"
    >

      {/* Heading */}
      <div className="flex items-center justify-between mb-2.5">
        <h2
          id="result-heading"
          className="font-display font-bold text-ink text-[17px]"
        >
          Choose your review
        </h2>

        <span className="text-[12px] font-medium text-ink-faint">
          {selectedReview + 1} / {reviews.length}
        </span>
      </div>

      {/* Slider */}
      <div className="relative">

        {/* Previous */}
        <button
          type="button"
          onClick={goPrevious}
          disabled={regenerating}
          aria-label="Previous review"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-surface-line shadow-card flex items-center justify-center text-ink-soft disabled:opacity-40"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12.5 4.5L7 10l5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Review card */}
        <div className="rounded-2xl border border-surface-line bg-white shadow-card p-4 min-h-[190px]">

          {editing ? (
            <textarea
              ref={textareaRef}
              value={review}
              onChange={(e) =>
                onChange(selectedReview, e.target.value)
              }
              rows={6}
              className="w-full resize-none text-[15px] leading-relaxed text-ink outline-none bg-transparent"
            />
          ) : (
            <p className="text-[15px] leading-relaxed text-ink whitespace-pre-wrap">
              {review}
            </p>
          )}

          {/* Card controls */}
          <div className="mt-3 flex items-center gap-4 pt-3 border-t border-surface-line">

            <button
              type="button"
              onClick={() => setEditing((value) => !value)}
              className="text-[13px] font-semibold text-ink-soft flex items-center gap-1 h-8"
            >
              <svg
                viewBox="0 0 20 20"
                className="h-3.5 w-3.5"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13.5 3.5l3 3L6 17H3v-3L13.5 3.5z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>

              {editing ? 'Done' : 'Edit'}
            </button>

            <button
              type="button"
              onClick={onRegenerate}
              disabled={regenerating}
              className="text-[13px] font-semibold text-ink-soft flex items-center gap-1 h-8 disabled:opacity-40"
            >
              <svg
                viewBox="0 0 20 20"
                className={`h-3.5 w-3.5 ${
                  regenerating ? 'animate-spin' : ''
                }`}
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M16 10a6 6 0 10-1.8 4.3M16 10V6m0 4h-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Regenerate
            </button>

          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={goNext}
          disabled={regenerating}
          aria-label="Next review"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white border border-surface-line shadow-card flex items-center justify-center text-ink-soft disabled:opacity-40"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7.5 4.5L13 10l-5.5 5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

      </div>

      {/* Slider dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {reviews.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setEditing(false)
              onSelect(index)
            }}
            aria-label={`Show review ${index + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              index === selectedReview
                ? 'w-5 bg-accent'
                : 'w-1.5 bg-surface-line'
            }`}
          />
        ))}
      </div>

      {/* Copy button */}
      <button
        type="button"
        onClick={handleCopyAndReview}
        disabled={regenerating || !review}
        className="mt-4 w-full h-14 rounded-2xl bg-accent text-white font-display font-bold text-[15px] shadow-pop active:scale-[0.98] transition-all disabled:opacity-40"
      >
        Copy &amp; Review on Google &rarr;
      </button>

      {/* Copy status */}
      <div
        className="h-5 mt-2 text-center"
        aria-live="polite"
      >
        {copyState === 'copied' && (
          <p className="text-[13px] font-semibold text-accent-ink animate-riseIn">
            Review copied ✓
          </p>
        )}

        {copyState === 'failed' && (
          <p className="text-[13px] font-semibold text-ink-soft animate-riseIn">
            Couldn&apos;t copy automatically — select the text above and copy it manually.
          </p>
        )}
      </div>

    </section>
  )
}
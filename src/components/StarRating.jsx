const LABELS = ['Very poor', 'Poor', 'Okay', 'Good', 'Excellent']

function StarIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-full w-full"
      fill={filled ? 'var(--accent, currentColor)' : 'none'}
      stroke={filled ? 'var(--accent, currentColor)' : '#D8D5CE'}
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinejoin="round"
        d="M12 3.5l2.6 5.44 5.9.68-4.36 4.15 1.13 5.9L12 16.9l-5.27 2.77 1.13-5.9L3.5 9.62l5.9-.68L12 3.5z"
      />
    </svg>
  )
}

export default function StarRating({ rating, onChange }) {
  return (
    <section aria-labelledby="rating-heading" className="text-center">
      <h2 id="rating-heading" className="font-display font-bold text-ink text-[19px] mb-3">
        How was your experience?
      </h2>

      <div className="flex justify-center gap-1.5" role="radiogroup" aria-label="Star rating">
        {[1, 2, 3, 4, 5].map((value) => {
          const active = value <= rating
          const justSelected = value === rating
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={value === rating}
              aria-label={`${value} star${value > 1 ? 's' : ''} — ${LABELS[value - 1]}`}
              onClick={() => onChange(value)}
              className={`h-11 w-11 sm:h-12 sm:w-12 p-1 rounded-xl transition-transform active:scale-90 ${
                justSelected ? 'animate-pop' : ''
              }`}
            >
              <StarIcon filled={active} />
            </button>
          )
        })}
      </div>

      <div className="h-6 mt-2" aria-live="polite">
        {rating > 0 && (
          <p className="text-[14px] font-semibold text-accent-ink animate-riseIn">
            {rating}/5 · {LABELS[rating - 1]}
          </p>
        )}
      </div>
    </section>
  )
}

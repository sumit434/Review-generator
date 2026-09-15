export default function ExperienceTags({ tags, selected, onToggle }) {
  return (
    <section aria-labelledby="tags-heading" className="animate-riseIn">
      <h2
        id="tags-heading"
        className="font-display font-semibold text-ink text-[15px] mb-2.5"
      >
        What stood out?
      </h2>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Experience highlights, optional"
      >
        {tags.map((tag) => {
          const active = selected.includes(tag)

          return (
            <button
              key={tag}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(tag)}
              className={`min-h-[40px] px-4 rounded-full text-[14px] font-medium border transition-colors active:scale-95 ${
                active
                  ? 'bg-accent-soft border-accent text-accent-ink'
                  : 'bg-white border-surface-line text-ink-soft'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                {active && (
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5 animate-checkPop"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 10.5l3.5 3.5L16 5.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {tag}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
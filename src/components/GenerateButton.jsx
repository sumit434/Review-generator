export default function GenerateButton({ onClick, disabled, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full h-14 rounded-2xl bg-accent text-white font-display font-bold text-[16px] shadow-pop disabled:opacity-40 disabled:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.3" strokeWidth="3" />
            <path d="M21 12a9 9 0 00-9-9" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
          Writing your review...
        </>
      ) : (
        'Create my review \u2728'
      )}
    </button>
  )
}

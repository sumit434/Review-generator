export default function BusinessHeader({ name, tagline, logoUrl }) {
  const initial = name?.trim()?.[0]?.toUpperCase() || '?'

  return (
    <header className="flex items-center gap-3 px-1 pt-1">
      <div className="h-11 w-11 shrink-0 rounded-full bg-accent-soft flex items-center justify-center overflow-hidden">
        {logoUrl ? (
          <img src={logoUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="font-display font-bold text-accent-ink text-lg" aria-hidden="true">
            {initial}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <h1 className="font-display font-bold text-ink text-[17px] leading-tight truncate">{name}</h1>
        <p className="text-ink-faint text-[13px] leading-tight">{tagline}</p>
      </div>
    </header>
  )
}

const MAX_LENGTH = 120

export default function OptionalNote({ value, onChange }) {
  return (
    <div className="animate-riseIn">
      <label htmlFor="note" className="block font-display font-semibold text-ink text-[15px] mb-2">
        Anything else? <span className="font-normal text-ink-faint">(optional)</span>
      </label>
      <input
        id="note"
        type="text"
        inputMode="text"
        maxLength={MAX_LENGTH}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell us in a few words..."
        className="w-full h-12 rounded-2xl border border-surface-line bg-white px-4 text-[15px] text-ink placeholder:text-ink-faint focus:border-accent outline-none"
      />
    </div>
  )
}

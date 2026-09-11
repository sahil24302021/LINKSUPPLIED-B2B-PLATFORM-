interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="text-xs font-mono uppercase tracking-widest text-copper mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base text-slate leading-relaxed ${
            centered ? "max-w-2xl mx-auto" : "max-w-[65ch]"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

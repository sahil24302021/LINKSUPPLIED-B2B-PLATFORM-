import { Info } from "@phosphor-icons/react/dist/ssr";

export function SampleDataTag() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-copper/10 text-copper text-xs font-medium border border-copper/20">
      <Info size={12} weight="fill" />
      Sample data - for demonstration
    </span>
  );
}

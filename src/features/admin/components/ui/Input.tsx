export function Input({
  value,
  onChange,
  ...props
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder: string;
}) {
  return (
    <input
      {...props}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
    />
  );
}

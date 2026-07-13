import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function Input({
  value,
  onChange,
  type,
  ...props
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && visible ? "text" : type;
  if (isPassword) {
    return (
      <div className="relative">
        <input
          {...props}
          type={inputType}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-r-xl"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  }
  return (
    <input
      {...props}
      type={type}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
    />
  );
}

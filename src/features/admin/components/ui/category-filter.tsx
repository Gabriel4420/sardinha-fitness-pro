import { Tags } from "lucide-react";

export type CategorySummary = {
  name: string;
  count: number;
};

type Props = {
  categories: CategorySummary[];
  selected: string;
  total: number;
  onSelect: (category: string) => void;
};

export function CategoryFilter({ categories, selected, total, onSelect }: Props) {
  if (!categories.length) return null;

  return (
    <section
      className="mb-5 rounded-2xl border border-border bg-card p-3"
      aria-labelledby="category-filter-title"
    >
      <div className="mb-3 flex items-center gap-2 px-1">
        <Tags className="text-primary" size={17} />
        <h3 id="category-filter-title" className="text-sm font-bold">
          Categorias existentes
        </h3>
        <span className="ml-auto text-xs text-muted-foreground">
          {categories.length} categoria(s)
        </span>
      </div>
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label="Filtrar produtos por categoria"
      >
        <CategoryButton
          label="Todas"
          count={total}
          active={selected === ""}
          onClick={() => onSelect("")}
        />
        {categories.map((category) => (
          <CategoryButton
            key={category.name}
            label={category.name}
            count={category.count}
            active={selected === category.name}
            onClick={() => onSelect(category.name)}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${active ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-primary-foreground/15" : "bg-muted text-muted-foreground"}`}
      >
        {count}
      </span>
    </button>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function AdminSkeleton() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      role="status"
      aria-label="Carregando painel administrativo"
    >
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-border bg-card p-5 lg:block">
        <div className="flex items-center gap-3">
          <Skeleton className="size-11" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-2 w-20" />
          </div>
        </div>
        <div className="mt-12 space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="h-12 w-11/12" />
        </div>
        <Skeleton className="absolute bottom-5 left-5 right-5 h-32 rounded-2xl" />
      </aside>
      <div className="lg:pl-72">
        <header className="flex h-20 items-center border-b border-border px-4 md:px-8">
          <Skeleton className="h-10 max-w-md flex-1" />
          <Skeleton className="ml-auto size-10" />
        </header>
        <main className="mx-auto max-w-7xl p-4 md:p-8">
          <Skeleton className="h-48 w-full rounded-3xl" />
          <div className="my-8 grid gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
            <div className="space-y-3">
              <Skeleton className="mb-6 h-8 w-56" />
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 rounded-2xl border border-border bg-card p-3">
                  <Skeleton className="h-18 w-22" />
                  <div className="flex-1 space-y-3 py-1">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <Skeleton className="h-6 w-44" />
              <div className="mt-6 space-y-4">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-14" />
              </div>
            </div>
          </div>
        </main>
      </div>
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

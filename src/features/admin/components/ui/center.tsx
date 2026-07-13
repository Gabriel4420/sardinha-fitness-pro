export function Center({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background p-4 text-foreground">
      {children}
    </main>
  );
}

export default function Loading() {
  return (
    <div className="animate-pulse bg-surface-subtle px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop">
      <div className="mx-auto max-w-5xl">
        <div className="mb-space-lg h-4 w-40 rounded bg-surface-container" />
        <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
          <div className="rounded-2xl bg-surface-canvas p-space-xl shadow-sm lg:col-span-7">
            <div className="mb-3 h-3 w-24 rounded bg-surface-container" />
            <div className="mb-4 h-10 w-2/3 rounded bg-surface-container" />
            <div className="mb-8 h-16 w-full rounded bg-surface-container" />
            <div className="h-32 w-full rounded bg-surface-container" />
          </div>
          <div className="rounded-2xl bg-surface-canvas p-space-xl shadow-sm lg:col-span-5">
            <div className="mb-6 h-20 w-full rounded bg-surface-container" />
            <div className="h-12 w-full rounded bg-surface-container" />
          </div>
        </div>
      </div>
    </div>
  );
}

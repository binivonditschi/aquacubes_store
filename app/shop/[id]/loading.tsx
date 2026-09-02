export default function Loading() {
  return (
    <div className="animate-pulse bg-off-white">
      <section className="pb-20 pt-[120px]">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <div className="mb-8 h-4 w-40 rounded bg-gray-100" />

          <div className="grid items-start gap-12 lg:grid-cols-[55%_45%]">
            <div className="rounded-2xl bg-slate-50 p-8">
              <div className="mx-auto aspect-square w-full max-w-[380px] rounded-xl bg-gray-100" />
            </div>

            <div>
              <div className="mb-3 h-3 w-16 rounded bg-gray-100" />
              <div className="mb-4 h-10 w-2/3 rounded bg-gray-100" />
              <div className="mb-6 h-6 w-24 rounded bg-gray-100" />
              <div className="mb-8 h-16 w-full rounded bg-gray-100" />
              <div className="h-12 w-full rounded-button bg-gray-100" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

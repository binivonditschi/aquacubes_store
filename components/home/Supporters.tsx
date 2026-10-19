import content from "@/content/home.json";

export default function Supporters() {
  const { supporters } = content;

  return (
    <section className="border-t border-border-subtle bg-surface-canvas px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-space-lg text-label-technical uppercase text-steel">{supporters.title}</div>
        <div className="flex flex-wrap items-center justify-center gap-space-md">
          {supporters.logos.map((logo) => (
            <div
              key={logo.src}
              className="flex h-20 items-center justify-center rounded-lg border border-border-subtle bg-surface-canvas px-space-lg py-space-md shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="max-h-10 w-auto object-contain" src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

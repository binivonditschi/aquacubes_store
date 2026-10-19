import Icon from "@/components/b2b/Icon";
import content from "@/content/home.json";

const toneClass: Record<string, string> = {
  primary: "text-primary",
  green: "text-compliance-green",
};

const featureTone: Record<string, { box: string; footer: string }> = {
  cyan: { box: "bg-accent-cyan-light text-primary", footer: "text-primary" },
  green: { box: "bg-compliance-green-bg text-compliance-green", footer: "text-compliance-green" },
  navy: { box: "bg-secondary-container text-surface-navy", footer: "text-surface-navy" },
};

export default function Technology() {
  const { technology, features } = content;

  return (
    <>
      <section
        id="technical-specs"
        className="bg-surface-canvas px-margin py-space-3xl md:px-margin-tablet lg:px-margin-desktop"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-space-2xl flex flex-col justify-between gap-space-md md:flex-row md:items-end">
            <div>
              <span className="text-label-technical font-bold uppercase text-primary">{technology.eyebrow}</span>
              <h2 className="mt-1 text-headline-xl-mobile text-surface-navy md:text-headline-xl">{technology.title}</h2>
            </div>
            <p className="max-w-md text-body-md text-steel">{technology.description}</p>
          </div>

          <div className="rounded-2xl bg-surface-subtle p-space-md shadow-sm md:p-space-lg">
            <h3 className="mb-space-md flex items-center gap-2 text-headline-lg text-surface-navy">
              <Icon name="tune" className="text-primary" />
              {technology.tableTitle}
            </h3>
            <div className="space-y-space-xs text-body-md">
              {technology.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex flex-col justify-between gap-1 rounded-xs px-3 py-2.5 sm:flex-row sm:items-center ${
                    i % 2 === 0 ? "bg-surface-canvas" : "bg-surface-subtle"
                  }`}
                >
                  <span className="font-medium text-steel">{spec.label}</span>
                  <span className={`font-bold sm:text-right ${toneClass[spec.tone ?? ""] ?? "text-surface-navy"}`}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-space-md pt-space-sm text-center">
              <a
                href="#yield-calculator"
                className="inline-flex items-center gap-1 text-body-md font-semibold text-primary hover:underline"
              >
                <span>{technology.calculatorLink}</span>
                <Icon name="arrow_forward" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface px-margin py-space-3xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-space-2xl max-w-3xl text-center">
            <span className="text-label-technical font-bold uppercase text-primary">{features.eyebrow}</span>
            <h2 className="mt-1 text-headline-xl-mobile text-surface-navy md:text-headline-xl">{features.title}</h2>
            <p className="text-body-lg text-on-surface-variant">{features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
            {features.items.map((item) => {
              const tone = featureTone[item.tone];
              return (
                <div
                  key={item.title}
                  className="flex flex-col justify-between rounded-2xl bg-surface-canvas p-space-xl shadow-sm"
                >
                  <div>
                    <div className={`mb-space-md flex h-12 w-12 items-center justify-center rounded-lg ${tone.box}`}>
                      <Icon name={item.icon} size={28} />
                    </div>
                    <h3 className="mb-space-xs text-headline-md text-surface-navy">{item.title}</h3>
                    <p className="text-body-md leading-relaxed text-steel">{item.description}</p>
                  </div>
                  <div className={`mt-space-md text-label-technical font-semibold uppercase ${tone.footer}`}>
                    {item.footer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

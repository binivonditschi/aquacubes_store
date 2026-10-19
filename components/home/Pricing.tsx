import Icon from "@/components/b2b/Icon";
import PlanCard from "@/components/b2b/PlanCard";
import { getPlans } from "@/lib/plans";
import content from "@/content/home.json";

export default function Pricing() {
  const { pricing } = content;

  return (
    <section
      id="commercial-packages"
      className="bg-surface px-margin py-space-3xl md:px-margin-tablet lg:px-margin-desktop"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-space-2xl max-w-3xl text-center">
          <div className="mb-space-xs inline-block text-label-technical font-semibold uppercase text-primary">
            {pricing.eyebrow}
          </div>
          <h2 className="mb-space-sm text-headline-xl-mobile text-surface-navy md:text-headline-xl">{pricing.title}</h2>
          <p className="text-body-lg text-on-surface-variant">{pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-space-lg lg:grid-cols-3">
          {getPlans().map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-space-xl rounded-2xl bg-surface-subtle p-space-lg shadow-sm">
          <div className="flex flex-col items-center justify-between gap-space-md md:flex-row">
            <div className="flex items-center gap-space-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-aquamarine/20 text-primary">
                <Icon name="stars" size={28} />
              </div>
              <div>
                <div className="text-headline-md text-surface-navy">{pricing.earlyBird.title}</div>
                <div className="text-body-sm text-steel">{pricing.earlyBird.description}</div>
              </div>
            </div>
            <div className="whitespace-nowrap rounded bg-surface-canvas px-space-md py-2 text-label-technical font-bold uppercase text-primary shadow-sm">
              {pricing.earlyBird.availability}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

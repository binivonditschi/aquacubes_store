import Link from "next/link";
import Icon from "@/components/b2b/Icon";
import { isPurchasable, type Plan } from "@/lib/plans";

/** One commercial tier card, styled after the b2b pricing section. */
export default function PlanCard({ plan, action }: { plan: Plan; action?: React.ReactNode }) {
  const featured = Boolean(plan.badge);
  const isCustom = !isPurchasable(plan);

  const buttonClass = featured
    ? "bg-primary-container hover:bg-primary text-on-primary shadow-md"
    : isCustom
      ? "bg-surface-navy hover:bg-surface-navy-elevated text-on-primary shadow-sm"
      : "bg-surface-subtle hover:bg-surface-container text-surface-navy shadow-sm";

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl bg-surface-canvas p-space-xl ${
        featured ? "shadow-xl lg:-mt-4" : "shadow-sm transition-shadow hover:shadow-md"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xs bg-primary-container px-space-md py-1 text-label-technical font-bold uppercase text-on-primary shadow-md">
          {plan.badge}
        </div>
      )}

      <div>
        <div className={`mb-space-sm flex items-center justify-between ${featured ? "pt-2" : ""}`}>
          <span
            className={`text-label-technical uppercase ${featured ? "font-bold text-primary" : "text-steel"}`}
          >
            {plan.eyebrow}
          </span>
          <span
            className={`rounded-xs px-2 py-0.5 text-body-sm ${
              featured ? "bg-accent-cyan-light font-bold text-primary" : "bg-surface-subtle text-on-surface-variant"
            }`}
          >
            {plan.sizeBadge}
          </span>
        </div>
        <h3 className="mb-1 text-headline-lg text-surface-navy">{plan.name}</h3>
        <p className="mb-space-lg text-body-md text-steel">{plan.description}</p>

        <div className={`mb-space-lg rounded-lg p-space-md ${featured ? "bg-surface-container-low" : "bg-surface-subtle"}`}>
          <div className="flex items-baseline gap-1">
            <span className={`text-label-numeric-lg ${featured ? "text-primary" : "text-surface-navy"}`}>
              {plan.price}
            </span>
            <span className={`text-body-md ${featured ? "font-semibold text-surface-navy" : "text-steel"}`}>
              {plan.priceSuffix}
            </span>
          </div>
          <div className="mt-1 text-label-legal text-steel">{plan.terms}</div>
        </div>

        <ul className="mb-space-xl space-y-space-sm text-body-sm text-on-surface">
          {plan.features.map((feature) => (
            <li key={feature.text} className="flex items-start gap-2">
              <Icon
                name={feature.icon}
                size={18}
                className={`mt-0.5 ${"muted" in feature && feature.muted ? "text-steel" : "text-primary"}`}
              />
              <span>
                {"strong" in feature && feature.strong && <strong>{feature.strong} </strong>}
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {action ??
          (isCustom ? (
            <a
              href={plan.contactHref ?? "/kontakt"}
              className={`block w-full rounded px-space-md py-3.5 text-center text-body-md font-bold transition-colors ${buttonClass}`}
            >
              {plan.buttonText}
            </a>
          ) : (
            <Link
              href={`/shop/${plan.id}`}
              className={`block w-full rounded px-space-md py-3.5 text-center text-body-md font-bold transition-colors ${buttonClass}`}
            >
              {plan.buttonText}
            </Link>
          ))}
        {plan.footnote && (
          <div
            className={`mt-2 text-center text-label-legal ${
              featured ? "font-semibold text-compliance-green" : "text-steel"
            }`}
          >
            {plan.footnote}
          </div>
        )}
      </div>
    </div>
  );
}

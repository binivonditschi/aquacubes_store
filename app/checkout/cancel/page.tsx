import Link from "next/link";
import Icon from "@/components/b2b/Icon";
import content from "@/content/checkout.json";

export default function CancelPage() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center bg-surface-subtle px-margin py-space-3xl">
      <div className="flex w-full max-w-md flex-col items-center gap-space-md rounded-2xl bg-surface-canvas p-space-xl text-center shadow-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-subtle text-steel">
          <Icon name="cancel" size={36} />
        </div>
        <h1 className="text-headline-lg text-surface-navy">{content.cancel.title}</h1>
        <p className="text-body-md text-steel">{content.cancel.description}</p>
        <div className="flex flex-col gap-space-sm sm:flex-row">
          <Link
            href="/leasing"
            className="rounded bg-surface-subtle px-space-lg py-3 text-body-md font-bold text-surface-navy transition-colors hover:bg-surface-container"
          >
            {content.cancel.retryButtonText}
          </Link>
          <Link
            href="/"
            className="rounded bg-primary-container px-space-lg py-3 text-body-md font-bold text-on-primary shadow-md transition-colors hover:bg-primary"
          >
            {content.cancel.shopButtonText}
          </Link>
        </div>
      </div>
    </div>
  );
}

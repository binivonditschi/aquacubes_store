import Link from "next/link";
import Icon from "@/components/b2b/Icon";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70dvh] items-center justify-center overflow-hidden bg-surface-subtle px-margin py-space-3xl">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-tertiary/10 blur-2xl" />

      <div className="relative flex w-full max-w-lg flex-col items-center gap-space-md rounded-2xl bg-surface-canvas p-space-xl text-center shadow-xl">
        <span className="rounded-xs bg-accent-cyan-light px-space-sm py-1 text-label-technical font-semibold text-tertiary">
          FEHLER 404
        </span>
        <h1 className="text-headline-xl-mobile text-surface-navy md:text-headline-xl">Seite nicht gefunden</h1>
        <p className="text-body-lg text-on-surface-variant">
          Diese Seite ist uns leider durch das Netz gegangen. Prüfen Sie die Adresse oder starten Sie auf der Startseite neu.
        </p>
        <div className="flex flex-col gap-space-sm sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-space-xs rounded bg-primary-container px-space-lg py-3 text-body-md font-bold text-on-primary shadow-md transition-colors hover:bg-primary"
          >
            <Icon name="home" size={20} />
            Zur Startseite
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-space-xs rounded bg-surface-subtle px-space-lg py-3 text-body-md font-bold text-surface-navy transition-colors hover:bg-surface-container"
          >
            <Icon name="mail" size={20} />
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  );
}

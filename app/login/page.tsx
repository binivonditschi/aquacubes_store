import Link from "next/link";
import { signIn, signUp } from "./actions";
import content from "@/content/login.json";

const inputClass =
  "w-full rounded bg-surface-subtle px-space-md py-3 text-body-md text-surface-navy shadow-sm outline-none focus:ring-2 focus:ring-primary/40";
const labelClass = "mb-1 block text-body-sm font-semibold text-surface-navy";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; mode?: string; next?: string }>;
}) {
  const params = await searchParams;
  const isSignUp = params.mode === "signup";
  const next = params.next && params.next.startsWith("/") ? params.next : "/";
  const modeQuery = (mode: string) => `/login?mode=${mode}${next !== "/" ? `&next=${encodeURIComponent(next)}` : ""}`;
  const mode = isSignUp ? content.signUp : content.signIn;

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-surface-subtle px-margin py-space-3xl">
      <div className="w-full max-w-md rounded-2xl bg-surface-canvas p-space-lg shadow-xl sm:p-space-xl">
        <div className="mb-space-xs text-label-technical font-semibold uppercase text-primary">{content.eyebrow}</div>
        <h1 className="mb-2 text-headline-lg text-surface-navy">{mode.title}</h1>
        <p className="mb-6 text-body-md text-steel">
          {next !== "/" ? content.checkoutRedirectDescription : mode.description}
        </p>

        {params.message && (
          <p className="mb-4 rounded bg-compliance-green-bg px-4 py-3 text-body-sm text-compliance-green">{params.message}</p>
        )}
        {params.error && (
          <p className="mb-4 rounded bg-error/10 px-4 py-3 text-body-sm text-error">{params.error}</p>
        )}

        <form action={isSignUp ? signUp : signIn} className="space-y-4">
          <input type="hidden" name="next" value={next} />

          {isSignUp && (
            <div>
              <label htmlFor="name" className={labelClass}>
                {content.nameLabel}
              </label>
              <input id="name" name="name" type="text" required className={inputClass} />
            </div>
          )}

          <div>
            <label htmlFor="email" className={labelClass}>
              {content.emailLabel}
            </label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>
              {content.passwordLabel}
            </label>
            <input id="password" name="password" type="password" required minLength={6} className={inputClass} />
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                {content.confirmPasswordLabel}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className={inputClass}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded bg-primary-container py-3.5 text-body-md font-bold text-on-primary shadow-md transition-colors hover:bg-primary"
          >
            {mode.submitText}
          </button>
        </form>

        <p className="mt-6 text-center text-body-md text-steel">
          {isSignUp ? (
            <>
              {content.toggleToSignIn.prompt}{" "}
              <Link href={modeQuery("signin")} className="font-semibold text-primary hover:underline">
                {content.toggleToSignIn.linkText}
              </Link>
            </>
          ) : (
            <>
              {content.toggleToSignUp.prompt}{" "}
              <Link href={modeQuery("signup")} className="font-semibold text-primary hover:underline">
                {content.toggleToSignUp.linkText}
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

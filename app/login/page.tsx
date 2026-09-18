import Link from "next/link";
import { signIn, signUp } from "./actions";
import content from "@/content/login.json";

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
    <div className="flex min-h-[80vh] items-center justify-center bg-off-white px-6 py-20">
      <div className="w-full max-w-md rounded-card bg-white p-8 shadow-card">
        <h1 className="mb-2 text-h3 text-navy">{mode.title}</h1>
        <p className="mb-6 text-sm text-gray-500">
          {next !== "/" ? content.checkoutRedirectDescription : mode.description}
        </p>

        {params.message && (
          <p className="mb-4 rounded-button bg-teal/10 px-4 py-3 text-sm text-teal">{params.message}</p>
        )}
        {params.error && (
          <p className="mb-4 rounded-button bg-error/10 px-4 py-3 text-sm text-error">{params.error}</p>
        )}

        <form action={isSignUp ? signUp : signIn} className="space-y-4">
          <input type="hidden" name="next" value={next} />

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-navy">
              {content.emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-button border border-gray-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/30"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-navy">
              {content.passwordLabel}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-button border border-gray-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/30"
            />
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-navy">
                {content.confirmPasswordLabel}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="w-full rounded-button border border-gray-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/30"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-button bg-teal py-3 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
          >
            {mode.submitText}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          {isSignUp ? (
            <>
              {content.toggleToSignIn.prompt}{" "}
              <Link href={modeQuery("signin")} className="font-medium text-teal hover:text-teal-dark">
                {content.toggleToSignIn.linkText}
              </Link>
            </>
          ) : (
            <>
              {content.toggleToSignUp.prompt}{" "}
              <Link href={modeQuery("signup")} className="font-medium text-teal hover:text-teal-dark">
                {content.toggleToSignUp.linkText}
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

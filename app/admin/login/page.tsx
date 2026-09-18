import { adminSignIn } from "./actions";
import content from "@/content/admin.json";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-off-white px-6">
      <div className="w-full max-w-md rounded-card bg-white p-8 shadow-card">
        <h1 className="mb-2 text-h3 text-navy">{content.login.title}</h1>
        <p className="mb-6 text-sm text-gray-500">{content.login.description}</p>

        {params.error && (
          <p className="mb-4 rounded-button bg-error/10 px-4 py-3 text-sm text-error">{params.error}</p>
        )}

        <form action={adminSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-navy">
              {content.login.emailLabel}
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
              {content.login.passwordLabel}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-button border border-gray-200 px-4 py-2.5 text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-button bg-navy py-3 text-sm font-medium text-white transition-colors hover:bg-navy-light"
          >
            {content.login.submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

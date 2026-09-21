import EmbedForm from "@/components/EmbedForm";

const DOMAIN = "https://your-domain"; // ← your real domain

export const SignInForm = () => (
  <EmbedForm scriptSrc={`${DOMAIN}/embed/signin.js`} tagName="aquacubes-signin" />
);

export const SignUpForm = () => (
  <EmbedForm scriptSrc={`${DOMAIN}/embed/signup.js`} tagName="aquacubes-signup" />
);

export const SalesForm = () => (
  <EmbedForm scriptSrc={`${DOMAIN}/embed/salesform.js`} tagName="aquacubes-salesform" />
);

export const NewsletterForm = () => (
  <EmbedForm scriptSrc={`${DOMAIN}/embed/newsletter.js`} tagName="aquacubes-newsletter" />
);

export const LeadForm = () => (
  <EmbedForm scriptSrc={`${DOMAIN}/embed/leadform.js`} tagName="aquacubes-leadform" />
);

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main py-32 text-center">
      <h1 className="font-display text-4xl text-[var(--text-primary)] mb-4">
        Page not found
      </h1>
      <p className="font-body text-[var(--text-secondary)] mb-8">
        The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="inline-block font-body text-sm font-medium text-[var(--accent)] underline underline-offset-2 hover:text-[var(--accent-hover)] transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}

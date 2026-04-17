import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-sm text-text-secondary mb-4">Page not found</p>
      <h1 className="text-6xl font-bold tracking-[-0.04em] text-white mb-4">
        404
      </h1>
      <p className="text-text-secondary mb-8 max-w-md">
        This page doesn&apos;t exist. It may have been moved or removed.
      </p>
      <Link
        href="/"
        className="px-7 py-3 rounded-lg bg-accent text-surface font-semibold text-sm hover:bg-accent/90 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}

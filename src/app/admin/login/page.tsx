"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (authError) throw authError;
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-0 px-4">
      <div className="w-full max-w-sm">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
          // ADMIN ACCESS
        </p>
        <h1 className="mb-8 font-display text-[36px] uppercase leading-[0.92] tracking-[-0.03em]">
          Elevated Customs
        </h1>

        {sent ? (
          <div className="rounded-sm border border-ink-4 bg-ink-1 px-6 py-8 text-center">
            <p className="font-display text-[20px] uppercase tracking-[-0.01em]">
              Check your email
            </p>
            <p className="mt-2 text-[14px] text-fg-2">
              Magic link sent to <span className="text-fg-1">{email}</span>.
              Click the link to sign in.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full rounded-sm border border-ink-4 bg-ink-1 px-4 py-3 text-[14px] text-fg-0 placeholder:text-fg-3 focus:border-accent focus:outline-none"
              />
            </div>
            {error && (
              <p className="font-mono text-[11px] text-stock-out">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-sm bg-accent text-[13px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Magic Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      // No emailRedirectTo — Supabase sends a 6-digit OTP code, not a magic link.
      // Requires "Email OTP" enabled in Supabase → Authentication → Providers → Email.
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });
      if (authError) throw authError;
      setStep("code");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send code");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code.trim(),
        type: "email",
      });
      if (verifyError) throw verifyError;
      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid code — check your email and try again");
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

        {step === "email" ? (
          <form onSubmit={handleSendCode} className="space-y-4">
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
              {loading ? "Sending…" : "Send Login Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="rounded-sm border border-ink-4 bg-ink-1 px-5 py-4">
              <p className="text-[14px] text-fg-1">
                A 6-digit code was sent to{" "}
                <span className="text-fg-0">{email}</span>.
              </p>
              <p className="mt-1 text-[13px] text-fg-3">Check your inbox and spam.</p>
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2">
                6-digit code
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                required
                autoFocus
                placeholder="123456"
                className="w-full rounded-sm border border-ink-4 bg-ink-1 px-4 py-3 text-center font-mono text-[24px] tracking-[0.3em] text-fg-0 placeholder:text-fg-3 focus:border-accent focus:outline-none"
              />
            </div>
            {error && (
              <p className="font-mono text-[11px] text-stock-out">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="flex h-12 w-full items-center justify-center rounded-sm bg-accent text-[13px] font-bold uppercase tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Sign In"}
            </button>
            <button
              type="button"
              onClick={() => { setStep("email"); setError(""); setCode(""); }}
              className="w-full font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3 transition-colors hover:text-fg-1"
            >
              ← Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

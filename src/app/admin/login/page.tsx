"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [passwordSet, setPasswordSet] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/status")
      .then((r) => r.json())
      .then((d) => setPasswordSet(!!d.passwordSet))
      .catch(() => setPasswordSet(true));
  }, []);

  const firstRun = passwordSet === false;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (firstRun) {
        if (password.length < 8) {
          setError("Password must be at least 8 characters.");
          setBusy(false);
          return;
        }
        if (password !== confirm) {
          setError("Passwords do not match.");
          setBusy(false);
          return;
        }
        const r = await fetch("/api/admin/setup-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (!(await r.json()).ok) {
          setError("Could not set password. Please try again.");
          setBusy(false);
          return;
        }
      } else {
        const r = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        const d = await r.json();
        if (!d.ok) {
          setError(
            d.error === "locked"
              ? `Too many attempts. Try again in about ${Math.ceil((d.lockedSeconds || 0) / 60)} minutes.`
              : "Incorrect password."
          );
          setBusy(false);
          return;
        }
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  const input =
    "w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-white text-gray-900 placeholder:text-gray-500 [color-scheme:light]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-xl border border-gray-400 p-6 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={64} height={64} />
          <h1 className="text-lg font-bold text-blue-800">Admin panel</h1>
        </div>

        {passwordSet === null ? (
          <p className="text-center text-gray-500 text-sm">Loading…</p>
        ) : (
          <>
            {firstRun && (
              <p className="text-sm text-gray-600">
                Welcome! Set a password to protect your admin panel. Keep it safe — you&apos;ll use it every time.
              </p>
            )}
            <input
              type="password"
              placeholder={firstRun ? "Create a password (min 8 characters)" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input}
              autoFocus
            />
            {firstRun && (
              <input
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={input}
              />
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="bg-blue-800 hover:bg-blue-700 disabled:opacity-60 text-white font-medium rounded-md px-6 py-3"
            >
              {busy ? "Please wait…" : firstRun ? "Create password & enter" : "Log in"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

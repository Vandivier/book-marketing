"use client";

import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

type WaitlistResponse = {
  message?: string;
};

const CONFIRM_MESSAGES: Record<string, string> = {
  "1": "Your email is confirmed. Welcome to the Evergreen Series waitlist.",
  invalid: "That confirmation link is invalid. Please sign up again.",
  expired: "That confirmation link expired. Please sign up again.",
};

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState<string>("");

  const urlParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const confirmed = urlParams.get("confirmed");
  const reason = urlParams.get("reason");
  const confirmKey = confirmed === "1" ? "1" : (reason ?? "");
  const confirmMessage = confirmKey ? CONFIRM_MESSAGES[confirmKey] : "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as WaitlistResponse;
      const responseMessage =
        data.message ??
        "Thanks for signing up. Please check your inbox to confirm your email.";

      if (!response.ok) {
        setStatus("error");
        setMessage(responseMessage);
        return;
      }

      setStatus("success");
      setMessage(responseMessage);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4 my-2">
      {confirmMessage ? (
        <div className="rounded-2xl border border-emerald-900/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {confirmMessage}
        </div>
      ) : null}

      <form
        id="waitlist"
        className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        onSubmit={handleSubmit}
      >
        <input
          className="p-4 h-12 flex-1 rounded-full border border-emerald-900/20 bg-white/80 px-5 text-sm text-emerald-950 placeholder:text-emerald-900/50 shadow-sm focus:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/30"
          type="email"
          name="email"
          placeholder="you@email.com"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "loading"}
        />
        <button
          className="h-12 cursor-pointer rounded-full bg-emerald-900 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-50 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-900/70"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Join the waitlist"}
        </button>
      </form>

      {message ? (
        <p
          className={`text-xs uppercase tracking-[0.25em] ${
            status === "error" ? "text-rose-700" : "text-emerald-900/70"
          }`}
        >
          {message}
        </p>
      ) : (
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-900/60">
          No spam. Only story drops and release updates.
        </p>
      )}
    </div>
  );
}

"use client";

import { FlashcardsIcon } from "@/app/_components/FlashcardsIcon";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function Page() {
  async function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailAddress = new FormData(event.currentTarget).get("email-address");
    if (!emailAddress) return;

    await supabase.auth.signInWithOtp({
      email: emailAddress.toString(),
      options: {
        emailRedirectTo: "http://localhost:3000/",
      },
    });
  }

  return (
    <div className="flex h-full w-full flex-col justify-center gap-10 bg-gray-900">
      <FlashcardsIcon className="mx-auto h-auto w-12 text-indigo-500" />

      <h2 className="text-center text-2xl/9 font-bold tracking-tight text-white">
        Sign in
      </h2>

      <div className="mx-auto w-sm">
        <form onSubmit={signInWithEmail} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email-address" className="text-sm/6 text-gray-100">
              Email address
            </label>

            <input
              id="email-address"
              name="email-address"
              type="email"
              required
              autoComplete="email"
              className="rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 text-white outline-1 -outline-offset-1 outline-gray-700 transition-all ease-in-out placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              placeholder="Email address"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white transition-all ease-in-out hover:bg-indigo-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

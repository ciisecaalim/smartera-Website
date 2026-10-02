"use client";

import { useEffect, useState } from "react";
import { ExceptionState } from "./exception-state";

/** Uses the browser network signal to show a recoverable offline screen. */
export function ConnectivityGuard() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "::1";

    const update = () =>
      setOffline(!isLocalhost && !navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return <div role="alert" aria-live="assertive" className="fixed inset-0 z-[100] overflow-y-auto bg-[#F5F9FF]"><ExceptionState eyebrow="Connection lost" title="You're offline" description="Check your internet connection, then try again. This page will close automatically when your connection returns." primaryHref="" action={<button type="button" onClick={() => window.location.reload()} className="min-h-11 rounded-xl bg-[#1B519F] px-5 py-3 text-xs font-black text-white shadow-md">Try again</button>} /></div>;
}




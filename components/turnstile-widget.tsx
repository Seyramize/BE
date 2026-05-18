"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export function TurnstileWidget({ onVerify, onExpire }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile) return;

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      callback: onVerify,
      "expired-callback": () => {
        onVerify("");
        onExpire?.();
      },
    });
  }, [onVerify, onExpire]);

  useEffect(() => {
    if (!siteKey && process.env.NODE_ENV !== "production") {
      onVerify("dev-bypass");
    }
  }, [onVerify]);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  if (!siteKey) {
    if (process.env.NODE_ENV === "production") {
      return (
        <p className="text-sm text-red-600">
          Security verification is unavailable. Please contact support.
        </p>
      );
    }
    return null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onLoad={renderWidget}
      />
      <div ref={containerRef} className="min-h-[65px]" />
    </>
  );
}

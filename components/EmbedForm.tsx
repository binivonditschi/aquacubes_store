"use client";

import { useEffect, useRef } from "react";

interface EmbedFormProps {
  scriptSrc: string;   // e.g. "https://your-domain/embed/newsletter.js"
  tagName: string;     // e.g. "aquacubes-newsletter"
}

export default function EmbedForm({ scriptSrc, tagName }: EmbedFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load each script only once, even if used on multiple pages
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

    // Mount the custom element
    if (containerRef.current && !containerRef.current.firstChild) {
      const el = document.createElement(tagName);
      containerRef.current.appendChild(el);
    }
  }, [scriptSrc, tagName]);

  return <div ref={containerRef} />;
}

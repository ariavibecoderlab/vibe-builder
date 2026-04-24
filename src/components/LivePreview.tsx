"use client";

import { useEffect, useRef, useState } from "react";
import { buildPreviewHtml } from "@/lib/code-preprocessor";

interface Props {
  code: string;
  device: "desktop" | "tablet" | "mobile";
}

export default function LivePreview({ code, device }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!code.trim()) return;
    const html = buildPreviewHtml(code);
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    doc.open();
    doc.write(html);
    doc.close();
  }, [code, key]);

  const widths = { desktop: "100%", tablet: "768px", mobile: "375px" };

  return (
    <div className="h-full flex items-start justify-center bg-[#0a0a0a] overflow-auto p-4">
      <div style={{ width: widths[device], maxWidth: "100%", height: "100%" }} className="bg-white rounded-lg overflow-hidden shadow-2xl">
        <iframe
          ref={iframeRef}
          key={key}
          title="Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => {}}
        />
      </div>
    </div>
  );
}

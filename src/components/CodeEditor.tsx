"use client";

import { useEffect, useRef } from "react";

interface Props {
  code: string;
}

export default function CodeEditor({ code }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [code]);

  return (
    <div className="h-full overflow-auto">
      <textarea
        ref={ref}
        value={code}
        readOnly
        className="w-full h-full bg-transparent text-gray-300 font-mono text-xs p-4 resize-none focus:outline-none leading-relaxed"
        spellCheck={false}
      />
    </div>
  );
}

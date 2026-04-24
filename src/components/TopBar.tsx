"use client";

import { useState } from "react";

interface Props {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  device: "desktop" | "tablet" | "mobile";
  onDeviceChange: (d: "desktop" | "tablet" | "mobile") => void;
}

export default function TopBar({ projectName, onProjectNameChange, device, onDeviceChange }: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="h-12 border-b border-[#262626] bg-[#0a0a0a] flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <span className="text-lg">⚡</span>
        {editing ? (
          <input
            value={projectName}
            onChange={e => onProjectNameChange(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={e => e.key === "Enter" && setEditing(false)}
            className="bg-[#1a1a1a] border border-[#262626] rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-violet-500"
            autoFocus
          />
        ) : (
          <button onClick={() => setEditing(true)} className="text-sm font-medium text-white hover:text-violet-400 transition">
            {projectName}
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {(["desktop", "tablet", "mobile"] as const).map(d => (
          <button
            key={d}
            onClick={() => onDeviceChange(d)}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              device === d ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {d === "desktop" ? "🖥" : d === "tablet" ? "📱" : "📲"}
          </button>
        ))}
        <div className="w-px h-5 bg-[#262626] mx-2" />
        <button className="px-3 py-1 rounded text-xs font-medium bg-[#1a1a1a] text-gray-300 hover:text-white border border-[#262626] transition">
          Save
        </button>
        <button className="px-3 py-1 rounded text-xs font-medium bg-violet-600 hover:bg-violet-500 text-white transition">
          Deploy
        </button>
      </div>
    </div>
  );
}

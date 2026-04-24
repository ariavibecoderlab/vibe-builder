"use client";

import { useState } from "react";
import ChatPanel from "@/components/ChatPanel";
import CodeEditor from "@/components/CodeEditor";
import LivePreview from "@/components/LivePreview";
import TopBar from "@/components/TopBar";

export default function Home() {
  const [code, setCode] = useState("");
  const [projectName, setProjectName] = useState("My Vibe App");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [leftTab, setLeftTab] = useState<"chat" | "code">("chat");

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a]">
      <TopBar
        projectName={projectName}
        onProjectNameChange={setProjectName}
        device={device}
        onDeviceChange={setDevice}
      />
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-[380px] border-r border-[#262626] flex flex-col">
          <div className="flex border-b border-[#262626]">
            <button
              onClick={() => setLeftTab("chat")}
              className={`flex-1 py-2.5 text-xs font-medium transition ${
                leftTab === "chat" ? "text-white border-b-2 border-violet-500" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              ⚡ Chat
            </button>
            <button
              onClick={() => setLeftTab("code")}
              className={`flex-1 py-2.5 text-xs font-medium transition ${
                leftTab === "code" ? "text-white border-b-2 border-violet-500" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              &lt;/&gt; Code
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            {leftTab === "chat" ? (
              <ChatPanel onCodeGenerated={setCode} currentCode={code} />
            ) : (
              <CodeEditor code={code} />
            )}
          </div>
        </div>
        {/* Right Panel - Preview */}
        <div className="flex-1">
          {code ? (
            <LivePreview code={code} device={device} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-5xl mb-4">⚡</div>
                <h2 className="text-xl font-medium mb-2 text-gray-300">Vibe Builder</h2>
                <p className="text-sm">Chat with Vibe to start building your app</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Card, Button } from "@/components/ui";
import MDEditor from 'react-markdown';

export function GeminiChat({ context }: { context?: string }) {
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
    { role: 'model', content: 'Initializing Secure AI Cyber Link...\nHello. I am the SentinelCore AI Agent. How can I assist you with this threat analysis?' }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput("");
    
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          instruction: `You are an expert cybersecurity analyst AI assistant helping a human analyst. Context: ${context || ''}`,
          isFast: false // Use pro for better analysis
        })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessages([...newMessages, { role: 'model', content: data.text }]);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err: any) {
      setMessages([...newMessages, { role: 'model', content: `**Error:** System encountered an anomaly reaching the AI core. Details: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full min-h-[500px] border-slate-800 bg-[#111218]">
      
      <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide bg-[#0c0d12]/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'model' && (
              <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
            )}
            
            <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
              m.role === 'user' 
                ? 'bg-cyan-600 text-white shadow-lg' 
                : 'bg-slate-800/80 border border-slate-700 text-slate-200 shadow-md'
            }`}>
              {m.role === 'model' ? (
                <div className="markdown-body prose prose-invert prose-sm">
                  <MDEditor>{m.content}</MDEditor>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{m.content}</div>
              )}
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
            </div>
            <div className="max-w-[80%] rounded-lg px-4 py-3 bg-slate-800/80 border border-slate-700 text-slate-200 flex flex-col gap-2">
              <div className="h-2 w-12 bg-slate-600 rounded animate-pulse" />
              <div className="h-2 w-24 bg-slate-600 rounded animate-pulse" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t border-slate-800 bg-[#111218] flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Query AI Swarm..."
          className="flex-1 bg-[#0c0d12] border border-slate-700 rounded p-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
        />
        <Button onClick={sendMessage} disabled={!input.trim() || isLoading} className="px-6 rounded p-2.5 h-auto">
          <Send className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </Card>
  )
}

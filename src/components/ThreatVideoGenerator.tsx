import React, { useState, useRef } from "react";
import { Video, Upload, Play, Loader2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/components/ui";

export function ThreatVideoGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("Generate a high-tech cybersecurity visualization based on this threat topology");
  
  const [status, setStatus] = useState<"idle" | "uploading" | "generating" | "downloading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [operationName, setOperationName] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      // Extract base64
      const base64Data = result.split(',')[1];
      setImage(base64Data);
      setMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const generateVideo = async () => {
    setStatus("generating");
    setErrorMsg("");

    try {
      // 1. Start generation
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: image, mimeType, prompt })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      const opName = data.operationName;
      setOperationName(opName);

      // 2. Poll for status
      const pollInterval = setInterval(async () => {
        try {
          const pollRes = await fetch("/api/video-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ operationName: opName })
          });
          const pollData = await pollRes.json();
          
          if (pollData.hasError) {
            clearInterval(pollInterval);
            setStatus("error");
            setErrorMsg("Generation failed at provider level.");
          } else if (pollData.done) {
            clearInterval(pollInterval);
            downloadVideo(opName);
          }
        } catch (e) {
          console.error("Polling error", e);
        }
      }, 5000); // poll every 5s

    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  const downloadVideo = async (opName: string) => {
    setStatus("downloading");
    try {
      const res = await fetch("/api/video-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operationName: opName })
      });
      
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setStatus("done");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <Card className="min-h-[500px]">
      <CardHeader className="border-b border-slate-800 bg-slate-800/20">
        <CardTitle className="text-sm uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Video className="w-4 h-4 text-cyan-500" />
          Threat Visualization Engine (Veo)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {status === "done" && videoUrl ? (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in duration-500">
            <video src={videoUrl} controls autoPlay loop className="w-full max-h-[400px] rounded-lg border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]" />
            <Button onClick={() => { setStatus("idle"); setVideoUrl(null); }}>Generate Another</Button>
          </div>
        ) : status === "generating" || status === "downloading" ? (
          <div className="flex flex-col items-center justify-center h-[300px] gap-6 text-center">
            <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <div>
              <h3 className="text-xl font-bold font-mono tracking-tight text-white mb-2">
                {status === "generating" ? "RENDERING THREAT MODEL..." : "DOWNLOADING SEQUENCE..."}
              </h3>
              <p className="text-sm text-slate-400">This requires immense AI computation. Please hold.</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <p className="text-sm text-slate-400">
                Upload a network graph, architectural diagram, or UI screenshot. Our Veo-powered video engine will animate it into a dynamic threat simulation.
              </p>
              
              <div 
                className="w-full aspect-video border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 hover:bg-[#0c0d12] transition-all relative overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                {image ? (
                  <>
                    <img src={`data:${mimeType};base64,${image}`} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="z-10 bg-[#0c0d12]/80 px-4 py-2 rounded font-mono text-sm border border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-bold">IMAGE SECURED</div>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-slate-500 mb-2" />
                    <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">Click to Upload Base Image</span>
                  </>
                )}
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-slate-500">Cinematic Prompt</label>
                <textarea 
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  className="w-full bg-[#0c0d12] border border-slate-800 rounded p-3 text-sm min-h-[100px] focus:outline-none focus:border-cyan-500 transition-colors text-slate-200"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-sm font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <Button onClick={generateVideo} className="w-full py-4 text-sm tracking-widest" disabled={!prompt.trim()}>
                <Play className="w-5 h-5 mr-2" />
                INITIATE RENDER SEQUENCE
              </Button>
            </div>
            
            <div className="hidden lg:flex w-1/3 flex-col gap-4 border-l border-slate-800 pl-8">
              <h4 className="font-bold font-mono text-sm text-slate-300">RENDER SPECS</h4>
              <ul className="text-xs space-y-3 text-slate-500 font-mono">
                <li><span className="text-slate-400">ENGINE:</span> Veo 3.1 Lite</li>
                <li><span className="text-slate-400">RESOLUTION:</span> 720p HD</li>
                <li><span className="text-slate-400">RATIO:</span> 16:9 Landscape</li>
                <li><span className="text-slate-400">STATUS:</span> <span className="text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">ONLINE</span></li>
              </ul>
              <div className="mt-8 p-4 rounded bg-cyan-500/5 border border-cyan-500/20">
                <AlertCircle className="w-5 h-5 text-cyan-400 mb-2" />
                <p className="text-xs text-cyan-300/80 leading-relaxed">Generations usually take 1-3 minutes. This system synthesizes massive amounts of visual threat data into comprehensible video formats.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

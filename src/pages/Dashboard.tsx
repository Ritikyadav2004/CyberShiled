import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UploadCloud, FileTerminal, BugPlay, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const MOCK_ANALYSES = [
  { id: "demo-1", name: "WhatsApp_Gold_v8.apk", risk: 9.8, status: "Malicious", date: "2 mins ago", family: "Trojan.AndroidOS.Triada" },
  { id: "demo-2", name: "AngryBirds_Mod.apk", risk: 6.5, status: "Suspicious", date: "1 hour ago", family: "AdWare.AndroidOS.MobiDash" },
  { id: "demo-3", name: "Calculator_Plus.apk", risk: 0.2, status: "Safe", date: "3 hours ago", family: "None" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      navigate("/analysis/demo-new");
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-500 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Threat Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm">Upload an APK or review recent scans.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Upload Widget */}
        <Card className="md:col-span-2 relative overflow-hidden flex flex-col justify-center items-center p-10 border-cyan-500/20 bg-cyan-950/10 group cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:border-cyan-500/40 transition-colors" onClick={simulateUpload}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {isUploading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
              <div className="text-cyan-400 font-mono font-bold animate-pulse text-sm uppercase">Decompiling APK...</div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center z-10">
              <div className="w-20 h-20 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <UploadCloud className="w-10 h-10 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Drop APK File Here</h3>
                <p className="text-slate-400 text-sm max-w-sm">
                  Upload Android package (.apk) for deep AI inspection, static analysis, and sandboxed dynamic execution.
                </p>
              </div>
              <Button className="mt-4 pointer-events-none uppercase text-[11px] font-bold">Select File</Button>
            </div>
          )}
        </Card>

        {/* Quick Stats */}
        <div className="flex flex-col gap-6">
          <Card className="flex-1 bg-rose-950/10 border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.05)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" /> Malicious Samples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono text-rose-500">1,204</div>
              <p className="text-xs text-rose-400 mt-1 font-medium">+14% vs last week</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <BugPlay className="w-4 h-4 text-cyan-500" /> Total Sandbox Runs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono text-white">8,432</div>
              <p className="text-xs text-emerald-400 mt-1 font-medium">System Optimal</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Analyses List */}
      <div>
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <FileTerminal className="w-4 h-4 text-cyan-500" />
          RECENT ANALYSES
        </h2>
        <Card className="overflow-hidden">
          <div className="divide-y divide-slate-800">
            {MOCK_ANALYSES.map((item) => (
              <div key={item.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer gap-4" onClick={() => navigate(`/analysis/${item.id}`)}>
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border", 
                    item.status === 'Malicious' ? 'bg-rose-500/10 border-rose-500/30' : 
                    item.status === 'Suspicious' ? 'bg-orange-500/10 border-orange-500/30' :
                    'bg-emerald-500/10 border-emerald-500/30'
                  )}>
                    {item.status === 'Malicious' ? <XCircle className="text-rose-500 w-5 h-5" /> : 
                     item.status === 'Suspicious' ? <AlertTriangle className="text-orange-500 w-5 h-5" /> :
                     <CheckCircle2 className="text-emerald-500 w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span className="text-cyan-400 truncate max-w-[200px]">{item.family}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Risk Vector</span>
                    <span className={cn("font-bold font-mono text-lg", item.risk > 7 ? 'text-rose-500' : item.risk > 4 ? 'text-orange-400' : 'text-emerald-500')}>
                      {item.risk.toFixed(1)} <span className="text-xs text-slate-600">/ 10</span>
                    </span>
                  </div>
                  <Badge variant={item.status === 'Malicious' ? 'danger' : item.status === 'Suspicious' ? 'warning' : 'success'}>
                    {item.status}
                  </Badge>
                  <Search className="w-4 h-4 text-slate-500 hidden md:block" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
}

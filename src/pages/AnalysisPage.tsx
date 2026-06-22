import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import * as Tabs from '@radix-ui/react-tabs';
import { Card, CardHeader, CardTitle, CardContent, Badge, Progress, Button } from "@/components/ui";
import { ShieldAlert, Cpu, Activity, Glasses, Fingerprint, FileCode2, Network, Video, MessageSquareHeart, AlertTriangle, BrainCircuit, UploadCloud } from "lucide-react";
import { GeminiChat } from "@/components/GeminiChat";
import { ThreatVideoGenerator } from "@/components/ThreatVideoGenerator";

export function AnalysisPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Determine if we are showing the malicious demo
  const isMalicious = id === 'demo-1' || id === 'demo-new';

  return (
    <div className="flex-1 flex flex-col w-full h-full p-4 md:p-6 lg:max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-[#111218] p-6 rounded-xl border border-slate-800 shadow-xl relative overflow-hidden">
        {isMalicious && <div className="absolute top-0 left-0 w-full h-1 bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8)]" />}
        
        <div className="flex items-center gap-5">
          <div className={`p-4 rounded-xl border ${isMalicious ? 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)]' : 'bg-cyan-500/10 border-cyan-500/30'}`}>
            <Fingerprint className={isMalicious ? "w-8 h-8 text-rose-500" : "w-8 h-8 text-cyan-500"} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold tracking-tight text-white truncate max-w-sm md:max-w-md">WhatsApp_Gold_v8.apk</h1>
              <Badge variant={isMalicious ? 'danger' : 'success'} className="px-3 py-1 font-bold">
                {isMalicious ? 'ANOMALY DETECTED' : 'SYSTEM OPTIMAL'}
              </Badge>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              SHA256: e3b0c44298fc1c149afbf4c8996fb924...
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Global Risk Index</div>
          <div className={`text-4xl font-bold font-mono ${isMalicious ? 'text-rose-500 text-glow-red' : 'text-emerald-500'}`}>
            {isMalicious ? '9.8' : '0.2'} <span className="text-lg text-slate-600">/ 10</span>
          </div>
        </div>
      </div>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
        <Tabs.List className="flex overflow-x-auto gap-2 bg-[#0c0d12] p-1.5 rounded-lg border border-slate-800 mb-6 shrink-0 scrollbar-hide">
          <TabTrigger value="overview" icon={<Cpu className="w-4 h-4"/>} label="Overview" />
          <TabTrigger value="static" icon={<FileCode2 className="w-4 h-4"/>} label="Static Intel" />
          <TabTrigger value="behavior" icon={<Activity className="w-4 h-4"/>} label="Behavioral" />
          <TabTrigger value="agents" icon={<Glasses className="w-4 h-4"/>} label="AI Agents" />
          <TabTrigger value="chain" icon={<Network className="w-4 h-4"/>} label="Attack Chain" />
          <TabTrigger value="video" icon={<Video className="w-4 h-4"/>} label="Sim Video" />
          <TabTrigger value="chat" icon={<MessageSquareHeart className="w-4 h-4"/>} label="AI Chat" />
        </Tabs.List>

        <div className="flex-1 relative">
          <Tabs.Content value="overview" className="h-full space-y-6 outline-none">
            <OverviewTab isMalicious={isMalicious} />
          </Tabs.Content>
          <Tabs.Content value="static" className="h-full outline-none">
            <StaticTab />
          </Tabs.Content>
          <Tabs.Content value="behavior" className="h-full outline-none">
            <BehaviorTab />
          </Tabs.Content>
          <Tabs.Content value="agents" className="h-full outline-none">
            <AgentsTab />
          </Tabs.Content>
          <Tabs.Content value="chain" className="h-full outline-none">
            <AttackChainTab />
          </Tabs.Content>
          <Tabs.Content value="video" className="h-full outline-none">
            <ThreatVideoGenerator />
          </Tabs.Content>
          <Tabs.Content value="chat" className="h-full outline-none">
            <GeminiChat context="user is looking at WhatsApp_Gold_v8.apk analysis. It's highly malicious." />
          </Tabs.Content>
        </div>
      </Tabs.Root>

    </div>
  );
}

// ---------------------------------------------------------
// Tab Trigger Component
// ---------------------------------------------------------
function TabTrigger({ value, icon, label }: { value: string, icon: React.ReactNode, label: string }) {
  return (
    <Tabs.Trigger 
      value={value}
      className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all text-slate-500 hover:text-slate-200 hover:bg-slate-800/50 data-[state=active]:bg-[#111218] data-[state=active]:text-cyan-400 data-[state=active]:border data-[state=active]:border-slate-800 outline-none whitespace-nowrap uppercase tracking-wider"
    >
      {icon}
      {label}
    </Tabs.Trigger>
  )
}

// ---------------------------------------------------------
// Overview Tab
// ---------------------------------------------------------
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

function OverviewTab({ isMalicious }: { isMalicious: boolean }) {
  const threatData = isMalicious ? [
    { subject: 'Data Exfil', A: 92, fullMark: 100 },
    { subject: 'Persistence', A: 78, fullMark: 100 },
    { subject: 'Financial Fraud', A: 95, fullMark: 100 },
    { subject: 'Evasion', A: 60, fullMark: 100 },
    { subject: 'Destruction', A: 30, fullMark: 100 },
  ] : [
    { subject: 'Data Exfil', A: 10, fullMark: 100 },
    { subject: 'Persistence', A: 5, fullMark: 100 },
    { subject: 'Financial Fraud', A: 0, fullMark: 100 },
    { subject: 'Evasion', A: 15, fullMark: 100 },
    { subject: 'Destruction', A: 0, fullMark: 100 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Executive Summary */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-slate-800 bg-slate-800/20">
            <CardTitle className="text-sm uppercase tracking-wider text-slate-300">Executive AI Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-slate-400 text-sm leading-relaxed">
              {isMalicious 
                ? "The analyzed APK exhibits strong characteristics of the Triada banking trojan family. It requests excessive permissions including RECEIVE_SMS and SYSTEM_ALERT_WINDOW. Static decompilation reveals obfuscated payload drops, while behavioral sandboxing caught it attempting to exfiltrate contact lists to a known Russian C2 server."
                : "No malicious indicators found. The application requests standard permissions congruent with its advertised functionality. Network activity is limited to standard telemetry."}
            </p>
            {isMalicious && (
              <div className="bg-rose-950/20 border border-rose-500/30 p-4 rounded-lg flex gap-4 mt-4 items-start shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-bold text-rose-400 uppercase tracking-widest">CRITICAL MITIGATION REQUIRED</h4>
                  <p className="text-xs text-rose-300/80 mt-1">This threat can overlay banking apps to steal credentials. Advise immediate MDM block and user password resets.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Risk Distribution Radar */}
        <Card>
          <CardHeader className="border-b border-slate-800 bg-slate-800/20">
            <CardTitle className="text-sm uppercase tracking-wider text-slate-300">Risk Vectors</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={threatData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontFamily: 'monospace' }} />
                <Radar name="Risk Level" dataKey="A" stroke={isMalicious ? '#f43f5e' : '#06b6d4'} fill={isMalicious ? '#f43f5e' : '#06b6d4'} fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#0c0d12', border: '1px solid #1e293b', fontSize: '12px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Agent Status Panel */}
      <div>
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-cyan-500" />
          AI Swarm Status
        </h3>
        <AgentsGrid />
      </div>
    </div>
  )
}

function AgentsGrid() {
  const agents = [
    { name: "Reverse Engineering Agent", status: "Complete", finding: "Obfuscated dex class 'com.x.y.z' unpacks secondary payload.", color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/30", dot: "bg-emerald-500" },
    { name: "Behavioral Analysis Agent", status: "Analyzing", finding: "Simulating background service persistence triggers...", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30", dot: "bg-orange-500", pulsing: true },
    { name: "Threat Intel Agent", status: "Alert", finding: "Matched 3 IOCs to Triada family infrastructure.", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/30", dot: "bg-rose-500", pulsing: true },
    { name: "Risk Assessment Agent", status: "Waiting", finding: "Pending results from behavioral simulation.", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/30", dot: "bg-slate-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {agents.map((agent, i) => (
        <Card key={i} className="flex flex-col hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all">
          <CardContent className="p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${agent.bg} ${agent.border} border flex items-center justify-center shrink-0`}>
                 <span className={`text-xs font-bold font-mono ${agent.color}`}>{agent.name.split(' ').map(w => w[0]).join('').substring(0, 2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  {agent.pulsing && (
                    <span className={`absolute w-3 h-3 rounded-full ${agent.dot} animate-ping opacity-75`}></span>
                  )}
                  <span className={`relative w-2 h-2 rounded-full ${agent.dot}`}></span>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-widest ${
                  agent.status === 'Alert' ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20' : 
                  agent.status === 'Analyzing' ? 'text-orange-400 bg-orange-500/10 border border-orange-500/20' : 
                  agent.status === 'Waiting' ? 'text-slate-400 bg-slate-800/50 border border-slate-700' : 
                  'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                }`}>
                  {agent.status}
                </span>
              </div>
            </div>
            <h3 className="text-sm font-bold text-white mb-2">{agent.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed italic line-clamp-2">"{agent.finding}"</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ---------------------------------------------------------
// Static Tab
// ---------------------------------------------------------
function StaticTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-8 duration-300">
      <Card>
        <CardHeader className="border-b border-slate-800 bg-slate-800/20">
          <CardTitle className="text-sm uppercase tracking-wider text-slate-300">Requested Permissions</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {[
              { p: 'android.permission.RECEIVE_SMS', risk: 'high' },
              { p: 'android.permission.SYSTEM_ALERT_WINDOW', risk: 'high' },
              { p: 'android.permission.READ_CONTACTS', risk: 'medium' },
              { p: 'android.permission.INTERNET', risk: 'low' },
              { p: 'android.permission.CAMERA', risk: 'low' }
            ].map(perm => (
              <div key={perm.p} className="flex items-center justify-between p-2.5 rounded bg-[#0c0d12] border border-slate-800">
                <span className="font-mono text-xs text-slate-400 truncate mr-2">{perm.p}</span>
                <Badge variant={perm.risk === 'high' ? 'danger' : perm.risk === 'medium' ? 'warning' : 'outline'}>
                  {perm.risk}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b border-slate-800 bg-slate-800/20">
          <CardTitle className="text-sm uppercase tracking-wider text-slate-300">Hardcoded Secrets</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="font-mono text-xs p-4 rounded-md bg-[#0c0d12] border border-slate-800 text-cyan-500 whitespace-pre-wrap overflow-x-auto h-[300px] leading-relaxed">
            {`> Executing strings extraction...
> FOUND: http://182.xx.xx.xx/payload/drop.bin
> FOUND: AES_KEY="s3cr3t_p@ssw0rd!"
> FOUND: /system/xbin/su (Root detection)
> FOUND: method: hideAppIcon()
> FOUND: method: interceptSms()
> FOUND: method: startOverlayActivity()

[!] WARNING: 6 suspicious API calls detected related to banking overlay payloads.`}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ---------------------------------------------------------
// Behavior Tab
// ---------------------------------------------------------
function BehaviorTab() {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 duration-300">
      <Card>
        <CardHeader className="border-b border-slate-800 bg-slate-800/20">
          <CardTitle className="text-sm uppercase tracking-wider text-slate-300">Sandbox Execution Log</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative border-l border-slate-700 ml-3 space-y-8 pb-4">
            <div className="relative pl-6">
              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <div className="font-mono text-xs text-slate-500 mb-1">00:00:01.002</div>
              <div className="font-bold text-white text-sm">App Launched</div>
            </div>
            <div className="relative pl-6">
              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <div className="font-mono text-xs text-slate-500 mb-1">00:00:03.410</div>
              <div className="font-bold text-white text-sm">Hide Icon Requested</div>
              <div className="text-xs border border-slate-700 bg-slate-800/50 p-2.5 rounded mt-2 text-slate-400 font-mono">
                PackageManager.setComponentEnabledSetting(AppIcon, COMPONENT_ENABLED_STATE_DISABLED)
              </div>
            </div>
            <div className="relative pl-6">
              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              <div className="font-mono text-xs text-slate-500 mb-1">00:00:08.922</div>
              <div className="font-bold text-white text-sm">Malicious Network Connection</div>
              <div className="text-xs border border-rose-500/20 bg-rose-950/20 text-rose-300 p-2.5 rounded mt-2 font-mono">
                TCP connection established to 182.23.41.99:443 (Known TrickBot C2)
                <br/>-&gt; Sending encrypted payload (4.1KB)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ---------------------------------------------------------
// Agents Tab
// ---------------------------------------------------------
function AgentsTab() {
  const agents = [
    { name: "Reverse Engineering Agent", status: "Complete", finding: "Obfuscated dex class 'com.x.y.z' unpacks secondary payload.", color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
    { name: "Behavioral Analysis Agent", status: "Analyzing", finding: "Simulating background service persistence triggers...", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
    { name: "Threat Intel Agent", status: "Alert", finding: "Matched 3 IOCs to Triada family infrastructure.", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/30" },
    { name: "Risk Assessment Agent", status: "Waiting", finding: "Pending results from behavioral simulation.", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-8 duration-300">
      {agents.map((agent, i) => (
        <Card key={i}>
          <CardContent className="p-5 flex gap-4">
            <div className={`w-10 h-10 rounded-lg ${agent.bg} ${agent.border} border flex items-center justify-center shrink-0`}>
               <span className={`text-xs font-bold font-mono ${agent.color}`}>{agent.name.split(' ').map(w => w[0]).join('').substring(0, 2)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-white">{agent.name}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${agent.status === 'Alert' ? 'text-rose-400 bg-rose-400/10' : agent.status === 'Analyzing' ? 'text-orange-400 bg-orange-400/10 animate-pulse' : agent.status === 'Waiting' ? 'text-slate-400 bg-slate-800' : 'text-emerald-400 bg-emerald-400/10'}`}>
                  {agent.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed italic">"{agent.finding}"</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ---------------------------------------------------------
// Attack Chain Tab
// ---------------------------------------------------------
function AttackChainTab() {
  return (
    <Card className="h-full min-h-[400px] flex items-center justify-center p-8 relative overflow-hidden animate-in zoom-in-95 duration-500">
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="#475569" strokeWidth="0.5"/></pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      <div className="flex flex-col md:flex-row items-center gap-4 relative z-10 w-full max-w-4xl justify-between">
        <ChainNode icon={<UploadCloud/>} sub="ENTRY POINT" label="APK_INSTALL" delay={0.1} color="slate" />
        <ChainLink color="slate" />
        <ChainNode icon={<Glasses/>} sub="ESCALATION" label="SMS_PERM" delay={0.3} color="cyan" glow />
        <ChainLink color="cyan" />
        <ChainNode icon={<Network/>} sub="EXFILTRATION" label="EXT_C2_CONN" delay={0.5} color="rose" glow alert />
        <ChainLink color="rose" />
        <ChainNode icon={<Activity/>} sub="CLEANUP" label="PERSIST_SVC" delay={0.7} color="slate" />
      </div>
    </Card>
  )
}

function ChainNode({ icon, sub, label, delay, color = 'cyan', glow = false, alert = false }: any) {
  const colorClass = color === 'cyan' ? 'border-cyan-500/50 bg-cyan-900/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 
                     color === 'rose' ? 'border-rose-500/50 bg-rose-950/20 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]' :
                     'border-slate-700 bg-slate-900/80 text-slate-400'
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`w-36 h-24 rounded-lg flex flex-col items-center justify-center relative border ${colorClass}`}
    >
      {alert && <div className="absolute -top-3 px-2 py-0.5 bg-rose-500 rounded text-[9px] font-bold text-white tracking-widest z-10">ANOMALY DETECTED</div>}
      <span className="text-[10px] uppercase mb-1 opacity-70 font-bold">{sub}</span>
      <span className="text-xs font-bold font-mono text-white">{label}</span>
      {React.cloneElement(icon, { className: 'w-5 h-5 mt-2 opacity-50' })}
    </motion.div>
  )
}

function ChainLink({ color = "slate" }: { color?: string }) {
  const bgClass = color === "cyan" ? "bg-cyan-500" : color === "rose" ? "bg-rose-500" : "bg-slate-700"
  
  return (
    <div className="hidden md:flex flex-1 h-0.5 bg-slate-800 relative">
      <motion.div 
        className={`absolute top-[-1px] w-8 h-1 ${bgClass} rounded-full opacity-50`}
        animate={{ left: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      />
    </div>
  )
}

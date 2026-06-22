import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Search, BrainCircuit, Activity, ChevronRight, UploadCloud, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function LandingPage() {
  return (
    <div className="w-full flex-1 flex flex-col">
      
      {/* Hero Section */}
      <section className="px-6 py-24 flex flex-col items-center justify-center text-center relative max-w-5xl mx-auto w-full">
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none -z-10">
          <pattern id="gridLarge" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#475569" strokeWidth="0.5"/></pattern>
          <rect width="100%" height="100%" fill="url(#gridLarge)" />
        </svg>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800/50 border border-slate-700 text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          NEXT-GEN MOBILE THREAT INTELLIGENCE
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
        >
          Unmask <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Mobile Malware</span><br/>
          Before It Strikes.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Advanced behavioral AI, static decompilation, and multi-agent neural analysis for zero-day Android threat hunting.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to="/dashboard" className="px-8 py-3.5 rounded bg-cyan-600 text-white text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <UploadCloud className="w-5 h-5" />
            Start Analysis
          </Link>
          <a href="#features" className="px-8 py-3.5 rounded text-slate-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-slate-800 hover:text-white border border-slate-700 transition-colors">
            View Architecture
          </a>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-[#0c0d12] border-t border-slate-800/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <div className="inline-flex items-center justify-center p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 mb-6">
                <Shield className="w-6 h-6" />
             </div>
            <h2 className="text-3xl font-bold mb-4 text-white">CORE <span className="text-cyan-400">CAPABILITIES</span></h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Powered by a swarm of specialized LLM agents and deep heuristics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Search className="w-5 h-5 text-cyan-400" />}
              title="Static Decompilation"
              desc="Deep manifest inspection, hardcoded secret extraction, and permissions mapping without executing code."
            />
            <FeatureCard 
              icon={<Activity className="w-5 h-5 text-indigo-400" />}
              title="Dynamic Sandboxing"
              desc="Simulates execution paths, API hooking, and network requests to detect evasive runtime behaviors."
            />
            <FeatureCard 
              icon={<BrainCircuit className="w-5 h-5 text-emerald-400" />}
              title="AI Swarm Intelligence"
              desc="Multiple specialized AI agents vote on threat vectors, providing explainable risk assessments."
            />
            <FeatureCard 
              icon={<Network className="w-5 h-5 text-rose-400" />}
              title="Attack Chain Graph"
              desc="Visualizes the complete MITRE ATT&CK lifecycle from installation to exfiltration."
            />
            <FeatureCard 
              icon={<Zap className="w-5 h-5 text-orange-400" />}
              title="Instant Threat Reports"
              desc="Auto-generates executive summaries and highly technical IOC datasets instantly."
            />
            <FeatureCard 
              icon={<Shield className="w-5 h-5 text-blue-400" />}
              title="Dark Web Intel Sync"
              desc="Cross-references hashes and domains against live zero-day threat feeds."
            />
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-[#111218] flex flex-col gap-4 group hover:border-cyan-500/50 transition-colors shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]">
      <div className="w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
        {icon}
      </div>
      <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

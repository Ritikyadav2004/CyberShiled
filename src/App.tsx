/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { Dashboard } from "@/pages/Dashboard";
import { AnalysisPage } from "@/pages/AnalysisPage";
import { Navbar } from "@/components/Navbar";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-[var(--color-brand)] selection:text-black">
        <Navbar />
        <main className="flex-1 flex flex-col relative z-10 w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analysis/:id" element={<AnalysisPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

import React, { useState } from 'react';
import { Github, Music, Shield, FileJson, BarChart3, Lock } from 'lucide-react';
import Modal from './ui/Modal';

const Layout = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null); // 'how-it-works' | 'privacy' | null

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-neutral-200 font-sans selection:bg-red-500/30">
      
      {/* NAVBAR */}
      <nav className="w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO AREA (Enhanced) */}
          <div className="flex items-center gap-4 group cursor-default">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <div className="relative bg-gradient-to-br from-red-600 to-red-800 p-2.5 rounded-xl shadow-lg border border-red-500/20">
                <Music size={24} className="text-white fill-white/20" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white leading-none">
                Music<span className="text-neutral-500 font-light">Wrapped</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mt-1">2025 Edition</span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveModal('how-it-works')}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              How it works
            </button>
            <a 
              href="https://github.com/yourusername" // Update this later
              target="_blank" 
              rel="noreferrer"
              className="text-neutral-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col justify-center relative z-0">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <p>© 2025 MusicWrapped. Not affiliated with Google or YouTube.</p>
          <div className="flex gap-6">
            <button 
              onClick={() => setActiveModal('privacy')}
              className="hover:text-neutral-400 transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}

      {/* 1. HOW IT WORKS MODAL */}
      <Modal 
        isOpen={activeModal === 'how-it-works'} 
        onClose={() => setActiveModal(null)}
        title="How it Works"
      >
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            Since YouTube Music doesn't have an official API for listening history, we use a clever workaround using your Google Takeout data.
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="bg-blue-500/20 p-2 rounded-lg h-fit text-blue-400"><FileJson size={20} /></div>
              <div>
                <h4 className="text-white font-medium text-sm">1. You Export Data</h4>
                <p className="text-xs text-gray-400 mt-1">You download your raw history file from Google.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="bg-purple-500/20 p-2 rounded-lg h-fit text-purple-400"><Lock size={20} /></div>
              <div>
                <h4 className="text-white font-medium text-sm">2. Local Processing</h4>
                <p className="text-xs text-gray-400 mt-1">We parse this file <strong>inside your browser</strong>. It is never uploaded to any server.</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="bg-green-500/20 p-2 rounded-lg h-fit text-green-400"><BarChart3 size={20} /></div>
              <div>
                <h4 className="text-white font-medium text-sm">3. Instant Insights</h4>
                <p className="text-xs text-gray-400 mt-1">We calculate your top songs, artists, and minutes listened instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* 2. PRIVACY POLICY MODAL */}
      <Modal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
      >
        <div className="space-y-4 text-sm text-gray-300">
          <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
            <Shield size={18} />
            <span>Short Version: You are safe.</span>
          </div>
          <p>
            This application is <strong>Client-Side Only</strong>. This means:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li>Your JSON file never leaves your computer.</li>
            <li>We do not have a backend server.</li>
            <li>We do not use cookies to track you.</li>
            <li>We cannot see, store, or sell your data even if we wanted to.</li>
          </ul>
          <p className="pt-4 border-t border-white/10 mt-4">
            The code is Open Source on GitHub. You can inspect it yourself to verify these claims.
          </p>
        </div>
      </Modal>

    </div>
  );
};

export default Layout;
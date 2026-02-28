"use client"
import { useState } from "react"
import { Menu, X, Linkedin, Instagram } from "lucide-react"

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header
      className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-gray-600/30 border border-white/10 text-white shadow-2xl overflow-hidden flex flex-col
        ${isOpen ? 'w-[80%] h-[80vh] md:h-[80vh] rounded-[32px]' : 'w-[90%] md:w-[30%] h-[42px] rounded-full'}
      `}
      style={{
        transition: isOpen
          ? 'width 1s ease-in-out, height 1s ease-in-out 1s, border-radius 1s ease-in-out'
          : 'height 1s ease-in-out, width 1s ease-in-out 1s, border-radius 1s ease-in-out 1s'
      }}
    >
      {/* Top Bar (always visible) */}
      <div className="w-full flex justify-between items-center p-2 h-[42px] shrink-0 relative z-20">
        <div className="flex-[1] flex justify-start">
          <h1 className="flex items-center gap-2 pl-2">
            <img src="/yuz.jpg" alt="yuz" className="w-6 h-6 rounded-full object-cover" />
            Yuzusii
          </h1>
        </div>

        <div className="flex-[1] flex justify-end gap-2 pr-2">
          {isOpen ? (
            <>
              <button onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:bg-white/10 pl-2 pr-3 py-1.5 rounded-full transition-colors text-sm">
                <X size={18} /> Menu
              </button>
            </>
          ) : (
            <button onClick={() => setIsOpen(true)} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
              <Menu size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className="flex-1 flex flex-col md:flex-row w-full p-4 md:p-8 gap-4 md:gap-8 overflow-y-auto hide-scrollbar"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: isOpen ? 'opacity 0.5s ease-in-out 1.5s' : 'opacity 0.2s ease-in-out',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        {/* Left Column: My Services */}
        <div className="flex-[1.2] flex flex-col gap-4 bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
          <h3 className="text-gray-300 text-[10px] tracking-widest uppercase font-semibold">My Services</h3>
          <ul className="flex flex-col gap-5 mt-2">
            <li className="text-xl md:text-2xl font-light cursor-pointer hover:text-white transition-colors drop-shadow-sm">Video Editing</li>
            <li className="text-xl md:text-2xl font-light flex items-center gap-3 cursor-pointer hover:text-white transition-colors drop-shadow-sm">
              Motion Graphics
              <span className="bg-[#5a2ab3] text-[9px] px-1.5 py-0.5 rounded text-white font-semibold uppercase tracking-wider">Top</span>
            </li>
            <li className="text-xl md:text-2xl font-light cursor-pointer hover:text-white transition-colors drop-shadow-sm">Color Grading</li>
            <li className="text-xl md:text-2xl font-light cursor-pointer hover:text-white transition-colors drop-shadow-sm">Sound Design</li>
          </ul>
          <div className="mt-auto pt-6 flex items-center gap-3 text-sm cursor-pointer text-gray-200 hover:text-white transition-colors drop-shadow-sm">
            VFX <span className="bg-white/20 text-[9px] px-1.5 py-0.5 rounded text-white font-semibold uppercase tracking-wider">Pro</span>
          </div>
        </div>

        {/* Middle Column: Explore */}
        <div className="flex-1 flex flex-col gap-4 p-6">
          <h3 className="text-gray-300 text-[10px] tracking-widest uppercase font-semibold">Explore</h3>
          <ul className="flex flex-col gap-4 mt-2 text-gray-200">
            <li className="text-lg font-light hover:text-white transition-colors cursor-pointer drop-shadow-sm">Portfolio Reel</li>
            <li className="text-lg font-light hover:text-white transition-colors cursor-pointer drop-shadow-sm">Case Studies</li>
            <li className="text-lg font-light hover:text-white transition-colors cursor-pointer drop-shadow-sm">Contact Me</li>
          </ul>
          <div className="mt-auto pt-6 flex items-center gap-2">
            <button className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors focus:outline-none"><Linkedin size={16} fill="currentColor" /></button>
            <button className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors focus:outline-none"><Instagram size={16} /></button>
            <button className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors focus:outline-none flex items-center justify-center font-bold text-lg leading-none">𝕏</button>
          </div>
        </div>

        {/* Right Column: Featured */}
        <div className="flex-[1.8] bg-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:bg-white/15 transition-colors cursor-pointer border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] text-gray-300 uppercase tracking-widest font-semibold drop-shadow-sm">Recent Work</span>
            <span className="bg-[#ccff00] text-black text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">Watch Now</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium mb-6 leading-tight tracking-tight drop-shadow-md">Edited for<br />50+ Creators</h2>
          <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:scale-105 transition-transform text-sm shadow-lg">View Projects</button>

          <div className="flex items-center justify-center mt-10 -space-x-3">
            <img src="https://i.pravatar.cc/100?img=11" className="w-12 h-12 rounded-full border-2 border-[#1a1a1a] z-30" alt="member" />
            <img src="https://i.pravatar.cc/100?img=12" className="w-12 h-12 rounded-full border-2 border-[#1a1a1a] z-20" alt="member" />
            <img src="https://i.pravatar.cc/100?img=13" className="w-12 h-12 rounded-full border-2 border-[#1a1a1a] z-10" alt="member" />
            <img src="https://i.pravatar.cc/100?img=14" className="w-12 h-12 rounded-full border-2 border-[#1a1a1a] z-0" alt="member" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavBar
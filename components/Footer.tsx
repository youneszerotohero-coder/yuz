import React from 'react';
import { Youtube, Instagram } from 'lucide-react';
import RotatingText from './RotatingText';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.39 6.39 0 005.4 15.6 6.39 6.39 0 0011.8 22a6.28 6.28 0 006.35-6.19v-5.24a8.31 8.31 0 004.85 1.55v-3.41a4.93 4.93 0 01-3.41-2.02z" />
  </svg>
);

export default function Footer() {
  return (
    <footer id="footer" className="bg-black text-white pt-16 px-6 md:px-12 w-full min-h-[75vh] relative overflow-hidden flex flex-col items-center justify-between">
      <div className="w-full max-w-7xl relative z-10 flex flex-col h-full flex-grow">
        
        {/* Main Header Section */}
        <div className="mt-8 mb-auto relative">
          <h1 className="text-[10vw] md:text-[6.5vw] leading-[1.1] font-bold tracking-tighter flex flex-col items-start">
            <span className="flex items-center gap-2 md:gap-4 text-white">
              Lets
              <RotatingText
                texts={['visualize', 'create', 'build', 'design']}
                mainClassName="px-2 sm:px-2 md:px-3 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-flex"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
            <span className="block text-[#888888]">incredible work together.</span>
          </h1>
        </div>

        {/* Info Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-16 mb-8 gap-8">
          <div>
            <p className="text-[#888888] text-sm mb-2 font-medium">Email</p>
            <a href="mailto:Yuzusiibusiness.contact@gmail.com" className="text-lg md:text-xl font-medium hover:text-[#888888] transition-colors">
              Yuzusiibusiness.contact@gmail.com
            </a>
          </div>

          <div>
            <p className="text-[#888888] text-sm mb-3 font-medium md:text-right">Social</p>
            <div className="flex gap-3">
              <a href="https://www.youtube.com/@Yuzusii" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                <Youtube size={16} />
              </a>
              <a href="https://www.instagram.com/yuzusii" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://www.tiktok.com/@yuzusii" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#333333] mb-6"></div>

        {/* Meta Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs md:text-sm font-medium text-white mb-8 gap-4">
          <p>Based in Boufarik, Algeria</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#888888] transition-colors">Terms of service</a>
            <a href="#" className="hover:text-[#888888] transition-colors">Privacy Policy</a>
          </div>
          <p>© 2026 Yuzusii</p>
        </div>
      </div>

      {/* Huge Background Text */}
      <div className="w-full flex justify-center items-center overflow-hidden">
        <h2 className="translate-y-6 md:translate-y-16 text-[18vw] leading-none font-bold tracking-tighter text-white uppercase text-center w-full select-none" style={{ textShadow: "0 20px 50px rgba(255,255,255,0.2)"}}>
          YUZUSII
        </h2>
      </div>
    </footer>
  );
}

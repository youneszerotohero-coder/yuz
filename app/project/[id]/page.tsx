import Link from "next/link";
import { ArrowLeft, Play, ExternalLink } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Mock data to match what's in Hero.tsx + extra details
const projectsData = [
  { 
    id: "0", 
    title: "Cinematic Reel", 
    url: "/work1.jpg",
    client: "Nike",
    role: "Video Editor & Colorist",
    year: "2024",
    description: "A high-energy, fast-paced cinematic editing project showcasing dynamic motion graphics, intricate sound design, and aggressive color grading to match the brand's aesthetic. The project involved sorting through hours of raw footage to find the perfect narrative flow.",
    tags: ["Premiere Pro", "After Effects", "DaVinci Resolve"]
  },
  { 
    id: "1", 
    title: "Urban Showcase", 
    url: "/work2.jpg",
    client: "Streetwear Brand",
    role: "VFX Artist",
    year: "2023",
    description: "Integrating 3D elements and complex compositing into live-action footage. This showcase pushed the boundaries of visual effects, seamlessly blending reality with digital art to create a captivating promotional piece.",
    tags: ["Blender", "After Effects", "Nuke"]
  },
  { 
    id: "2", 
    title: "Documentary Intro", 
    url: "/work3.jpg",
    client: "National Geographic",
    role: "Motion Designer",
    year: "2024",
    description: "A beautifully animated title sequence combining archival footage with modern motion design techniques. The goal was to establish a somber yet inspiring tone before the documentary even began.",
    tags: ["After Effects", "Illustrator", "Photoshop"]
  },
  { 
    id: "3", 
    title: "Music Video FX", 
    url: "/work4.jpg",
    client: "Indie Artist",
    role: "Lead Editor",
    year: "2023",
    description: "An experimental music video heavily relying on mixed media, datamoshing, and rhythmically synchronized edits. The visual tempo was meticulously crafted to match the beat drops.",
    tags: ["Premiere Pro", "Sapphire Plugins", "Film emulation"]
  },
  { 
    id: "4", 
    title: "Tech Commercial", 
    url: "/work5.jpeg",
    client: "Tech Startup",
    role: "Sound Designer & Editor",
    year: "2024",
    description: "A sleek, minimalist commercial focusing on fluid motion and crisp, futuristic sound design. The auditory experience was designed from scratch to give the product a premium feel.",
    tags: ["Audition", "Premiere Pro", "Figma"]
  },
  { 
    id: "5", 
    title: "Automotive Promo", 
    url: "/work6.jpg",
    client: "Porsche",
    role: "Colorist",
    year: "2024",
    description: "Extensive color grading to bring out the sleek curves of the vehicle while maintaining a moody, cinematic atmosphere. We developed a custom LUT specifically for this campaign.",
    tags: ["DaVinci Resolve", "Color Grading", "Cinematography"]
  },
];

export default async function ProjectPage({ params }: { params: { id: string } }) {
  // Retrieve the awaited params directly depending on Next.js version,
  // but standard Next 14+ needs either standard parsing or direct access
  const projectId = params.id;
  
  // Safe fallback if id not found
  const project = projectsData.find(p => p.id === projectId) || {
    id: projectId,
    title: `Project ${projectId}`,
    url: "/work1.jpg",
    client: "Unknown",
    role: "Editor",
    year: "2024",
    description: "A creative endeavor exploring the boundaries of mixed media and digital editing.",
    tags: ["Editing", "Design"]
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-white/20">
      <div className="flex justify-center items-center z-50">
        <NavBar />
      </div>

      {/* Hero Header */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-end justify-start overflow-hidden pt-32 pb-16 px-6 md:px-16 lg:px-24">
        {/* Background Image with Parallax-like feel */}
        <div 
          className="absolute inset-0 z-0 opacity-40 scale-105"
          style={{
            backgroundImage: `url(${project.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-0" />
        
        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide uppercase">Back to Portfolio</span>
          </Link>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground mt-4">
            <span className="bg-white/10 px-3 py-1.5 rounded-full text-foreground/90 font-medium backdrop-blur-md">
              {project.role}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              {project.client}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              {project.year}
            </span>
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="w-full max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        
        {/* Left Col - Overview */}
        <div className="md:col-span-8 flex flex-col gap-8">
          <h2 className="text-3xl font-medium tracking-tight">Project Overview</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>
          
          <div className="w-full aspect-video rounded-2xl overflow-hidden mt-8 relative group bg-neutral-900 border border-white/10">
            <img 
              src={project.url} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
              <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                <Play className="ml-1" fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col - Metadata & Tools */}
        <div className="md:col-span-4 flex flex-col gap-10 md:pl-8 border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Client</h3>
            <p className="text-xl font-medium">{project.client}</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Role</h3>
            <p className="text-xl font-medium">{project.role}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Tools & Software</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-sm px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-foreground/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <button className="w-full py-4 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Live Preview <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Next Project Teaser */}
      <section className="w-full border-t border-white/10 py-24 flex flex-col items-center justify-center text-center px-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
        <span className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-4">Up Next</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter group-hover:opacity-80 transition-opacity">
          Ready for more?
        </h2>
        <Link href="/" className="mt-8 text-lg underline underline-offset-8 decoration-white/30 hover:decoration-white transition-colors">
          Return to All Projects
        </Link>
      </section>

      <Footer />
    </main>
  );
}

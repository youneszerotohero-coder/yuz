

function TestPics() {
    const ImageCard = ({ src,alt, mb = false }: { src: string,alt: string, mb?: boolean }) => (
        <div className={`relative overflow-hidden rounded-[0.5em] group cursor-pointer h-[8em] aspect-[9/10] ${mb ? 'mb-[1em]' : ''}`}>
            <img 
                src={src} 
                alt={alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-wide">more</span>
            </div>
        </div>
    );

    return (
        <div className="flex gap-5">
            <div className="hidden md:block mt-[4em]">
                <ImageCard src="/portrait1.png" alt="work2" mb />
                <ImageCard src="/portrait2.png" alt="work1" />
            </div>
            <div className="hidden md:block">
                <ImageCard src="/portrait11.png" alt="work1" mb />
                <ImageCard src="/portrait9.png" alt="work1" />
            </div>
            <div className="hidden md:block mt-[5em]">
                <ImageCard src="/portrait5.png" alt="work1" />
            </div>
            <div className="mt-[1em]">
                <ImageCard src="/portrait10.png" alt="work1" />
            </div>
            <div className="mt-[3em]">
                <ImageCard src="/portrait7.png" alt="work1" />
            </div>
            <div className="mt-[1em]">
                <ImageCard src="/portrait2.png" alt="work1" />
            </div>
            <div className="hidden md:block mt-[5em]">
                <ImageCard src="/portrait9.png" alt="work1" />
            </div>
            <div className="hidden md:block">
                <ImageCard src="/portrait10.png" alt="work1" mb />
                <ImageCard src="/portrait11.png" alt="work1" />
            </div>
            <div className="hidden md:block mt-[4em]">
                <ImageCard src="/portrait1.png" alt="work1" mb />
                <ImageCard src="/portrait2.png" alt="work1" />
            </div>
        </div>
    );
}

export default TestPics;    
import Hero from "@/pages/Hero";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <NavBar />
      </div>
      <Hero />
      <section className="w-full h-screen"></section>
    </>
  );
}

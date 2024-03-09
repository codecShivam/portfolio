import { Navbar } from "@/components/layout/Navbar";
import { BackgroundGradientAnimation } from "@/components/ui/backgroundAnimation";
import { SparklesCore } from "@/components/ui/sparkles";
import Timeline from "@/components/layout/Timeline";

export default function Home() {
  return (
    <div className="overflow-x-hidden" >
      <Navbar />
      <BackgroundGradientAnimation>
        <div className="absolute z-10 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
          <div className="bg-clip-text px-5 py-4 text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            <div className="absolute rounded-full pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]"></div>
            <p> Shivam  X codecShivam</p>
          </div>
        </div>
      </BackgroundGradientAnimation>
      <div className="bg-black">
        <div className=" w-screen flex flex-col items-center justify-center overflow-hidden rounded-md">
          <div className="w-screen h-40 relative">
            {/* Gradients */}

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-screen "
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>
        <Timeline />
      </div>
    </div>
  );
}

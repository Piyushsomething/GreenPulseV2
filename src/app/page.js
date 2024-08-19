import HowItWorks from "@/components/HomePage/HowItWorks";
import MissionStatement from "@/components/HomePage/MissionStatement";
import VideoBackground from "@/components/HomePage/VideoBackground";
import { Button } from "primereact/button";

const missionStatement =
  "Our mission leverages drone technology to transform barren lands into thriving ecosystems, championing global reforestation and biodiversity. Beyond planting trees, we're a force against climate change, using vivid imagery to highlight our journey from desolation to lushness. We invite you to join this movement of hope and restoration, impacting the planet's health tree by tree. Together, we're not just planting; we're cultivating the forests of tomorrow.";
const howItWorksSteps = [
  "Step 1: Sponsor a tree plantation",
  "Step 2: Monitor the growth of your sponsored trees",
];

export default function App() {
  return (
    <>
      <main className=" h-screen">
        <VideoBackground src="/video/drone.webm" />
        <MissionStatement statement={missionStatement} />
        <div className="text-black text-center md:text-left">
          <Button text className="md:ml-96 text-4xl md:text-6xl lg:text-8xl font-bold primary animate-pulse">
            Join the Green Revolution
          </Button>
        </div>
        <HowItWorks steps={howItWorksSteps} />
      </main>
    </>
  );
}

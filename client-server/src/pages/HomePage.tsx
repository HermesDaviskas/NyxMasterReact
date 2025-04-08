import GPSModule from "../components/GPS/GPS";
import LevelerTool from "../components/LevelerTool/LevelerTool";
import Orientation from "../components/Orientation/Orientation";

export default function HomePage() {
  return (
    <section className="pageContents h-full">
      <div className="flex flex-col h-full gap-4">
        <GPSModule />
        <LevelerTool />
      </div>
      <div className="flex flex-col h-full gap-4">
        <Orientation />
      </div>
    </section>
  );
}

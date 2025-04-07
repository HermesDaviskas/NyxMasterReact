import GPSModule from "../components/GPS/GPS";
import BaseLevelerTool from "../components/BaseLevelerTool/BaseLevelerTool";
import Orientation from "../components/Orientation/Orientation";

export default function HomePage() {
  return (
    <section className="pageContents h-full">
      <div className="flex flex-col h-full gap-4">
        <GPSModule />
        <BaseLevelerTool />
      </div>
      <div className="flex flex-col h-full gap-4">
        <Orientation />
      </div>
    </section>
  );
}

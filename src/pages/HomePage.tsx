import GPSModule from "../components/GPS/GPS";

export default function HomePage() {
  return (
    <section className="pageContents h-full">
      <div className="flex flex-col flex-grow h-full gap-4">
        <GPSModule />
        <GPSModule />
      </div>
    </section>
  );
}

import { useRef, useState, useCallback, lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import IntroScreen from "./components/IntroScreen";
import SectionWrapper from "./components/SectionWrapper";
import HeroSection from "./components/HeroSection";
import Admin from "./pages/Admin";
import { useLocation } from "react-router-dom";

// Lazy load heavy sections for better initial load
const TimelineSection = lazy(() => import("./components/TimelineSection"));
const GallerySection = lazy(() => import("./components/GallerySection"));
const WishesSection = lazy(() => import("./components/WishesSection"));
const QRSection = lazy(() => import("./components/QRSection"));
const FinaleSection = lazy(() => import("./components/FinaleSection"));
const MusicToggle = lazy(() => import("./components/MusicToggle"));
const AutoScrollToggle = lazy(() => import("./components/AutoScrollToggle"));
const SparklesBackground = lazy(() => import("./components/SparklesBackground"));


const SECTIONS = [
  { id: "hero", Component: HeroSection },
  { id: "timeline", Component: TimelineSection },
  { id: "gallery", Component: GallerySection },
  { id: "wishes", Component: WishesSection },
  { id: "qr", Component: QRSection },
  { id: "finale", Component: FinaleSection },
];

function App() {
  const location = useLocation();  // ✅ ADD THIS

  // ✅ ADMIN PAGE OVERRIDE (no UI conflict)
  if (location.pathname === "/admin-sunmathi-secret") {
    return <Admin />;
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [loopCount, setLoopCount] = useState(0);

  const handleLoop = useCallback(() => {
    setLoopCount((c) => c + 1);
  }, []);

  return (
    <>
      <LoadingScreen />
      <IntroScreen trigger={loopCount} />

      <Suspense fallback={null}>
        <SparklesBackground count={30} />
      </Suspense>

      <div ref={containerRef} className="snap-scroll">
        {SECTIONS.map(({ id, Component }) => (
          <SectionWrapper key={id}>
            <Suspense fallback={<div className="h-screen w-full bg-[#0c0514]" />}>
              <Component />
            </Suspense>
          </SectionWrapper>
        ))}
      </div>

      <Suspense fallback={null}>
        <AutoScrollToggle
          containerRef={containerRef}
          sectionCount={SECTIONS.length}
          intervalMs={5000}
          onLoop={handleLoop}
        />
        <MusicToggle />
      </Suspense>
    </>
  );
}

export default App;
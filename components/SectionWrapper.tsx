import { useRef, useEffect, useState, memo, type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
}

const SectionWrapper = memo(function SectionWrapper({
  children,
  className = "",
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`snap-section ${isVisible ? "section-visible" : "section-hidden"} ${className}`}
    >
      {children}
    </div>
  );
});

export default SectionWrapper;

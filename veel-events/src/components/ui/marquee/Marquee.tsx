import { useEffect, useRef } from "react";

export default function Marquee({ sponsors = [] }: { sponsors: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parentSelector = containerRef.current;

    if (!parentSelector) {
      return;
    }

    const clone = parentSelector.innerHTML;
    const firstElement = parentSelector.children[0] as HTMLUListElement;

    let i = 0;
    let rafId: number;

    parentSelector.insertAdjacentHTML("beforeend", clone);
    parentSelector.insertAdjacentHTML("beforeend", clone);

    const animate = () => {
      i += 0.5;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      firstElement.style.marginLeft = `-${i}px`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section>
      <h2 className="text-center font-normal">Our sponsors:</h2>
      <div
        ref={containerRef}
        className="overflow-hidden bg-white py-2 flex gap-2 mt-4"
      >
        <ul className="text-4xl text-primaryBlue imperial-script-regular whitespace-nowrap uppercase flex gap-2">
          {sponsors.map((item) => (
            <li key={item}>{item} • </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

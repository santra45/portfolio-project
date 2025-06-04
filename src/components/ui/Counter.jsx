import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Animated counter that counts from 0 to `value` when it enters the viewport.
 *
 * Props:
 * - value (number): Target number to count up to.
 * - duration (number): Duration of the count-up in seconds. Default 2.
 * - className (string): Optional Tailwind classes.
 */
export default function Counter({ value, duration = 2, className = '' }) {
  const [count, setCount] = useState(0);
  const frame = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();
    const totalMs = duration * 1000;

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / totalMs, 1);
      const current = Math.floor(progress * value);
      setCount(current);

      if (progress < 1) {
        frame.current = requestAnimationFrame(update);
      }
    };

    frame.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame.current);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}

'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

function cx(classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function RevealOnScroll({
  children,
  className = '',
  delayMs = 0,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canAnimate, setCanAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(function () {
    const node = ref.current;

    if (node == null) return;
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) return;
    if (('IntersectionObserver' in window) === false) return;

    const startsInView = node.getBoundingClientRect().top < window.innerHeight - 80;
    let observer: IntersectionObserver;
    let hasObserver = false;

    const frame = window.requestAnimationFrame(function () {
      setCanAnimate(true);
      setIsVisible(startsInView);
    });

    if (startsInView === false) {
      observer = new IntersectionObserver(
        function (entries) {
          const entry = entries[0];

          if (entry) {
            if (entry.isIntersecting === true) {
              setIsVisible(true);
              observer.disconnect();
            }
          }
        },
        {
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.12,
        },
      );

      hasObserver = true;
      observer.observe(node);
    }

    return function () {
      window.cancelAnimationFrame(frame);

      if (hasObserver) {
        observer.disconnect();
      }
    };
  }, []);

  const classes = [
    'transform-gpu',
    canAnimate
      ? 'transition-[opacity,transform,filter] duration-[820ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
      : '',
    canAnimate
      ? isVisible
        ? 'translate-y-0 opacity-100 blur-0'
        : 'translate-y-10 opacity-0 blur-[2px]'
      : 'translate-y-0 opacity-100 blur-0',
    className,
  ];
  const style: CSSProperties | undefined = delayMs
    ? { transitionDelay: String(delayMs) + 'ms' }
    : undefined;

  return (
    <div ref={ref} className={cx(classes)} style={style}>
      {children}
    </div>
  );
}

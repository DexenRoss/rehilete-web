'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

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

    const viewportOffset = window.innerHeight - 80 - node.getBoundingClientRect().top;
    const startsInView = Math.max(0, viewportOffset) === viewportOffset;
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
          rootMargin: '0px 0px -12% 0px',
          threshold: 0.08,
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

  const classes = ['translate-y-0 opacity-100'];
  let style;

  if (canAnimate) {
    classes.push(
      'transition-[opacity,transform] duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
    );
  }

  if (canAnimate) {
    if (isVisible === false) {
      classes.push('translate-y-5 opacity-0');
    }
  }

  if (className) {
    classes.push(className);
  }

  if (delayMs) {
    style = { transitionDelay: String(delayMs) + 'ms' };
  }

  return (
    <div ref={ref} className={cx(classes)} style={style}>
      {children}
    </div>
  );
}

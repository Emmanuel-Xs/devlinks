import { RefObject, useEffect, useRef } from "react";

export default function useFocusOnChange() {
  const focusTimeoutRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        cancelAnimationFrame(focusTimeoutRef.current);
      }
    };
  }, []);

  const requestFocus = (elementRef: RefObject<HTMLElement | null>) => {
    // Cancel any ongoing focus timeout
    if (focusTimeoutRef.current) {
      cancelAnimationFrame(focusTimeoutRef.current);
    }

    // Use a slightly longer delay on mobile
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    const delay = isTouchDevice ? 100 : 0;

    // Use setTimeout for mobile to ensure proper timing with keyboard
    if (isTouchDevice) {
      setTimeout(() => {
        if (elementRef.current) {
          elementRef.current.focus();
        }
      }, delay);
    } else {
      // Use requestAnimationFrame for desktop
      focusTimeoutRef.current = requestAnimationFrame(() => {
        focusTimeoutRef.current = requestAnimationFrame(() => {
          if (elementRef.current) {
            elementRef.current.focus();
          }
        });
      });
    }
  };

  return { requestFocus };
}

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

    // Schedule the focus operation
    focusTimeoutRef.current = requestAnimationFrame(() => {
      focusTimeoutRef.current = requestAnimationFrame(() => {
        if (elementRef.current) {
          elementRef.current.focus();
        }
      });
    });
  };

  return { requestFocus };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string, defaultSSRValue = false) {
  const subscribe = useCallback(
    (callback: any) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query]
  );

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return defaultSSRValue;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

import { useEffect } from "react";

import { PlatformKey } from "@/drizzle/schema";
import { validatePlatformUrl } from "@/lib/url-validation";
import { useLinksStore } from "@/store/links-store";

function useValidateUrl(linkId: string, url: string, platform: PlatformKey) {
  const setError = useLinksStore((state) => state.setError);
  const error = useLinksStore((state) => state.errors[linkId]);

  useEffect(() => {
    const { isValid, error: validationError } = validatePlatformUrl(
      url,
      platform
    );
    setError(
      linkId,
      !isValid ? validationError || "Invalid URL for this platform." : undefined
    );
  }, [url, platform, linkId, setError]);

  return error;
}

export default useValidateUrl;

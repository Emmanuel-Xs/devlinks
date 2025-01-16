import { useEffect, useState } from "react";

import { PlatformKey } from "@/drizzle/schema";
import { validatePlatformUrl } from "@/lib/url-validation";

function useValidateUrl(url: string, platform: PlatformKey) {
  const [urlError, setUrlError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const { isValid, error } = validatePlatformUrl(url, platform);

    if (!isValid) {
      setUrlError(error || "Invalid URL for this platform.");
    } else {
      setUrlError(undefined);
    }
  }, [url, platform]);

  return urlError;
}

export default useValidateUrl;

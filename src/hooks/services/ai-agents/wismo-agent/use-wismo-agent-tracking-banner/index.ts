import { useEffect, useState } from "react";

export const useWismoAgentTrackingBanner = () => {
  const [shouldShowTrackingBanner, setShouldShowTrackingBanner] =
    useState<boolean>(true);
  const [hasTrackingPlugin, setHasTrackingPlugin] = useState<boolean>(true);

  const updateHasTrackingPlugin = (value: boolean) => {
    setShouldShowTrackingBanner(!value);
    localStorage.setItem("wismo-tracking-plugin-installed", value.toString());
  };

  useEffect(() => {
    const hasPlugin = localStorage.getItem("wismo-tracking-plugin-installed");
    setShouldShowTrackingBanner(hasPlugin !== "true");
  }, []);

  return {
    shouldShowTrackingBanner,
    updateHasTrackingPlugin,
    hasTrackingPlugin,
    setHasTrackingPlugin,
  };
};

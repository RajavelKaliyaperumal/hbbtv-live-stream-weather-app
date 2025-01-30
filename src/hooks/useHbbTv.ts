import { useEffect, useState } from "react";
import RCKeySet from "../rcinteraction/RCKeySet";

interface HbbTVStatus {
  isHbbTV: boolean;
  isAppRunning: boolean;
}

const useHbbTV = (): HbbTVStatus => {
  const [status, setStatus] = useState<HbbTVStatus>({
    isHbbTV: false,
    isAppRunning: false,
  });

  useEffect(() => {
    try {
      const appManager = (window as any).oipfObjectFactory?.createApplicationManagerObject();
      console.log(appManager);
      if (appManager) {
        const app = appManager.getOwnerApplication(document);
        app.show();

        setStatus({
          isHbbTV: true,
          isAppRunning: true,
        });
        // when shown, app reacts to all buttons relevant on the scene
        RCKeySet.setKeyset(app, RCKeySet.getRelevantButtonsMask({navigation: true}));
      }
    } catch (error) {
      console.warn("HbbTV not supported on this device.");
    }
  }, []);

  return status;
};

export default useHbbTV;

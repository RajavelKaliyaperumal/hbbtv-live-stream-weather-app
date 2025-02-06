import { useEffect, useState } from "react";
import { OipfApplication, ApplicationManager} from "../types/HbbTV";

/*
Key Methods of Application Object
show(): Makes the application visible.
hide(): Hides the application.
destroyApplication(): Stops the application.
privateData.keyset.setValue(): Configures which remote control keys the app can use.
*/

const useHbbTv = () => {
    const [app, setApp] = useState<OipfApplication | null>(null);
    const [appManager, setAppManager] = useState<ApplicationManager | null>(null);
    const [isHbbTvSupported, setIsHbbTvSupported] = useState<boolean>(false);

    useEffect(() => {
        try {
            // Create Application Manager Object
            const appMan = document.createApplicationManagerObject("application/oipfApplicationManager");
            const ownerApp = appMan.getOwnerApplication(document);

            if (appMan && ownerApp) {
                setApp(ownerApp);
                setAppManager(appMan);
                setIsHbbTvSupported(true);
            }
        } catch (error) {
            console.warn("HbbTV environment not detected:", error);
            setIsHbbTvSupported(false);
        }
    }, []);

    return {
        isHbbTvSupported,
        app,
        appManager,
        showApp: () => app?.show(),
        hideApp: () => app?.hide(),
        exitApp: () => app?.destroyApplication(),
        setKeyset: (keys: number) => app?.privateData?.keyset.setValue(keys),
    };
};

export default useHbbTv;

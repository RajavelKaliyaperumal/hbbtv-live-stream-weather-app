export type OipfApplication = {
    show: () => void;
    hide: () => void;
    destroyApplication: () => void;
    privateData: {
        keyset: {
            setValue: (keys: number) => void;
        };
    };
};

export type ApplicationManager = {
    getOwnerApplication: (doc: Document) => OipfApplication;
};

export declare global {
    interface Document {
        createApplicationManagerObject: (type: string) => ApplicationManager;
    }
}
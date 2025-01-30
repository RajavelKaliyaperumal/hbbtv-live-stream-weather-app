const RCKeySet = {
    MASK_CONSTANT_RED: 0x1,
    MASK_CONSTANT_GREEN: 0x2,
    MASK_CONSTANT_YELLOW: 0x4,
    MASK_CONSTANT_BLUE: 0x8,
    MASK_CONSTANT_NAVIGATION: 0x10,
    MASK_CONSTANT_PLAYBACK: 0x20,
    MASK_CONSTANT_NUMERIC: 0x100,
    setKeyset:function(app, mask) {
        try {
            app.privateData.keyset.setValue(mask);
        } catch (e) {
            console.error("setKeyset Error",e)
            try {
                app.private.keyset.setValue(mask);
            }
            catch (ee) {
                // catch the error while setting keyset value 
                console.error("setKeyset Error",e)
            }
        }
    },
    getRelevantButtonsMask: function({navigation}){
        // mask includes color buttons
        //var mask = RCKeySet.MASK_CONSTANT_RED + RCKeySet.MASK_CONSTANT_GREEN + RCKeySet.MASK_CONSTANT_YELLOW + RCKeySet.MASK_CONSTANT_BLUE;
        // and navigation
        //mask += RCKeySet.MASK_CONSTANT_NAVIGATION;
        // add playback buttons if scene should react to them
        //mask += RCKeySet.MASK_CONSTANT_PLAYBACK;}
        // add numeric buttons if scene should react to them
        //mask += RCKeySet.MASK_CONSTANT_NUMERIC;}
        // return calculated button mask  
        return RCKeySet.MASK_CONSTANT_NAVIGATION;
    },
};

export default RCKeySet
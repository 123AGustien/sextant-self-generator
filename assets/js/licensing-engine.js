/* =========================
   SEXTANT LICENSING ENGINE
   MONETISATION CONTROL LAYER v1
========================= */

export function createLicensingEngine(){

    /* -------------------------
       INTERNAL STATE
    ------------------------- */

    let licenseState = {
        tier: "FREE",          // FREE | PRO | INSTITUTIONAL
        key: null,
        valid: false,
        usageCount: 0,
        usageLimit: 10,
        expiry: null
    };

    /* -------------------------
       MOCK LICENSE DATABASE
       (replace later with backend API)
    ------------------------- */

    const LICENSE_DB = {
        "FREE-DEMO-KEY": {
            tier: "FREE",
            usageLimit: 10
        },
        "PRO-1234-ABCD": {
            tier: "PRO",
            usageLimit: 1000
        },
        "INST-9999-ZETA": {
            tier: "INSTITUTIONAL",
            usageLimit: Infinity
        }
    };

    /* -------------------------
       VALIDATE LICENSE
    ------------------------- */

    function activateLicense(key){

        const record = LICENSE_DB[key];

        if(!record){
            licenseState.valid = false;
            licenseState.tier = "FREE";
            licenseState.key = null;
            return {
                success: false,
                message: "Invalid license key"
            };
        }

        licenseState.key = key;
        licenseState.tier = record.tier;
        licenseState.valid = true;
        licenseState.usageLimit = record.usageLimit;
        licenseState.usageCount = 0;

        return {
            success: true,
            tier: record.tier,
            message: "License activated"
        };
    }

    /* -------------------------
       USAGE TRACKING
    ------------------------- */

    function canExecute(){

        if(!licenseState.valid && licenseState.tier === "FREE"){
            return licenseState.usageCount < licenseState.usageLimit;
        }

        if(licenseState.tier === "INSTITUTIONAL"){
            return true;
        }

        return licenseState.usageCount < licenseState.usageLimit;
    }

    function registerUsage(){

        licenseState.usageCount++;

        if(licenseState.usageCount >= licenseState.usageLimit){
            return {
                allowed: false,
                message: "Usage limit reached"
            };
        }

        return {
            allowed: true
        };
    }

    /* -------------------------
       FEATURE GATING
    ------------------------- */

    function getFeatureSet(){

        switch(licenseState.tier){

            case "INSTITUTIONAL":
                return {
                    apiAccess: true,
                    scenarioLibrary: true,
                    interventionEngine: true,
                    exportData: true,
                    whiteLabel: true
                };

            case "PRO":
                return {
                    apiAccess: true,
                    scenarioLibrary: true,
                    interventionEngine: true,
                    exportData: false,
                    whiteLabel: false
                };

            default:
                return {
                    apiAccess: false,
                    scenarioLibrary: true,
                    interventionEngine: false,
                    exportData: false,
                    whiteLabel: false
                };
        }
    }

    /* -------------------------
       PUBLIC API
    ------------------------- */

    return {
        activateLicense,
        canExecute,
        registerUsage,
        getFeatureSet,
        getState: () => licenseState
    };
}

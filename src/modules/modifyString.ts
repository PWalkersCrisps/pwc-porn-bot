import { shortHand } from '../data/mulitplesOfBytes.json';
export = {
    capitalizeFirstLetter : function(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1); // Capitalize the first letter of a string
    },

    formatBytes : function(bytes: number, decimals = 2) {
        if (bytes === 0) return '0 Bytes'; // If the bytes is 0, return 0 Bytes

        const kilobyteConvertion = 1024; // The number of bytes in a kilobyte
        const n = Math.floor(Math.log(bytes) / Math.log(kilobyteConvertion)); // The number of suffixes to use
        const shortHandMultiplesOfBytes = shortHand;
        return parseFloat((bytes / Math.pow(kilobyteConvertion, n)).toFixed(decimals)) + ' ' + shortHandMultiplesOfBytes[n]; // Return the bytes in the correct format
    },

    isValidHttpUrl : function(string: string) {
        let url;
        try {
            url = new URL(string);
        }
        catch (_) {
            return false;
        }
        return true;
    },
};
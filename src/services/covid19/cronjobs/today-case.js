const {curlGet} = require("../../../utils/axios");
const {sysConfig} = require("../../../../config/config");
/*Setup default data*/
const endpointConfig = sysConfig.services;
const endpoint = `${endpointConfig.covid19_api}`;

module.exports.getTodayCases = async (params, options) => {
    options = {
        "Access-Control-Allow-Origin": "*",
        Cookie: 'PHPSESSID=6jc3erockjfe5qgv5no186qr35; _gid=GA1.2.424814864.1627803580; __atssc=facebook%3B3; _ga_6VB6CKFGQ3=GS1.1.1627840903.2.1.1627840911.52; __atuvc=27%7C31; __atuvs=6106e01250ed25e2001; _ga=GA1.2.2099671537.1627803580; _gat_gtag_UA_159954844_1=1; XSRF-TOKEN=eyJpdiI6IjlTK1wvcmtMRXRKdGdRQ25GdkdhZ2tBPT0iLCJ2YWx1ZSI6IkVwRUg5aGVIM0J0OXJKVjFNOGlUdDdZYktRdjhDY3NFXC96K0dna2NnRUtZQlRaREFKR29tQlI1Z0ZIQWFMeUpZbEVYcHhDZVwvdnAwM1hTZCsreHBOZFE9PSIsIm1hYyI6IjA1ODg5ZDgwOGZjOWE1ZTcyYzk5NjkwZWI1NzVlMzUwZmQzZjFhYTQ3MjJhOGVlMjg3NmFiZTRkMjgxOTNiZjgifQ%3D%3D; laravel_session=eyJpdiI6ImpLb2xObFJBamxLRVlERitmektuK1E9PSIsInZhbHVlIjoiRGxHUllzWFZhVVRITWgrRWFENnNmNG9US0xqdnNDbGNXSkljME5id0g1U1Zsb0dPN3p4RytRMUxadTU2bXVmZ29OSjRyS1hqWE5mT3NZMnpcL1NyMkl3PT0iLCJtYWMiOiI2Zjg1N2E3NTBjZTAxYzY1YWE1OTgxNmUyZTFlNDAxOWYyMzdhZDY0OGJmNDI2ZDAzZDBmYmIyYWVlNzZlNjU2In0%3D',
    }
    return await curlGet(endpoint, params, options);
}

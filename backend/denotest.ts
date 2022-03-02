/*
console.log(await fetch("https://dualis.dhbw.de/", {
    headers: {
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15"
    }
}))
*/
//console.log(await fetch("https://dualis.dhbw.de"))

//fetch("https://dualis.dhbw.de/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000324,-Awelcome").then(msg => console.log(msg)).catch(e => console.error(e))
//import ky from 'https://deno.land/x/ky@v0.23.0/index.js';
//import ky from 'https://unpkg.com/ky@0.29.0/distribution/index.js'
import ky from 'https://cdn.skypack.dev/ky?dts';
import {getDualisChanges} from "./dualis/dualis.ts"
import {
    Bson,
  } from "https://deno.land/x/mongo@v0.29.2/mod.ts";
console.log(await getDualisChanges(new Bson.ObjectId("621f6841a7db1e851b3563f1")))

import Utils from "./utils/utils.ts"






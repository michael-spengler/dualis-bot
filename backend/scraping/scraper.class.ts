import {
    Bson,
} from "https://deno.land/x/mongo@v0.29.2/mod.ts";
import axiod from "https://deno.land/x/axiod@0.24/mod.ts";
import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

export default class DualisScraper {
    static baseUrl = "https://dualis.dhbw.de"
    static landingPageURL = "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000324,-Awelcome"
    userId: Bson.ObjectId;
    constructor(userId: Bson.ObjectId) {
        this.userId = userId
    }

    public async loginAndGetRedirectUrl() {
        console.log("url:" + DualisScraper.baseUrl + DualisScraper.landingPageURL)

        let landingPageResponse = (await fetch(DualisScraper.baseUrl + DualisScraper.landingPageURL/*, 
            {
            method: "GET",
            credentials:"include",
            headers: {
                "Agent-Type":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15"
            }
        }
        */)).text

        //axiod.get(DualisScraper.baseUrl + DualisScraper.landingPageURL).then((response) => console.log(response.headers))
        console.log(landingPageResponse)
        console.log(landingPageResponse)
        const doc = new DOMParser().parseFromString(landingPageResponse.toString(), "text/html")
        if (!doc) {
            console.error("doc is null")
            return
        }
        const hiddenInputs = doc.getElementsByTagName("input").filter((input) => {
            console.log(input.attributes.getNamedItem("type").value)
        })

    }

}

/*
loginData = {
    APPNAME:   "",
    PRGNAME:   "",
    ARGUMENTS: "",
    clino:     "",
    menuno:    "",
    menu_type: "",
    browser:   "",
    plattform: "",
    usrname:   "",
    pass:      "",
}
*/
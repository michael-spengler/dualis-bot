import {
    Bson,
} from "https://deno.land/x/mongo@v0.29.2/mod.ts";
import IDualisCourse from "../interfaces/dualis.interface.ts"
import axiod from "https://deno.land/x/axiod/mod.ts";
import User from "../interfaces/user.interface.ts"
import Utils from "../utils/utils.ts"

export async function getDualisChanges(userId: Bson.ObjectId): Promise<IDualisCourse[]> {
    let user = await User.findOne({ _id: userId })
    if (!user) {
        throw new Error
    }

    //change when docker compose is finished
    let response = await axiod.post("http://localhost:8080/scrapedualis", {
        email: Utils.decrypt(user.dualis_username),
        password: Utils.decrypt(user.dualis_password)
    })

    return response.data
}

export function updateDatabase(dualisNew: any) {

}

import {Schema} from "https://deno.land/x/valivar/mod.ts"


let userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    dualis_username: { type: String, required: true },
    dualis_password: { type: String, required: true }
})
export default userSchema
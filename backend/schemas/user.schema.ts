import {Schema} from "https://deno.land/x/valivar@v6.2.11/mod.ts"


const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    dualis_username: { type: String, required: true },
    dualis_password: { type: String, required: true },
    active: {type: Boolean, required: true, default: true},
    notifications: {
        email: {
            notificationEmail: {type:String},
            withGrades: {type: Boolean},
            active: {type: Boolean}
        },
        discord: {
            notificationUsername: {type:String},
            withGrades: {type: Boolean},
            active: {type: Boolean}
        },
        telegram: {
            notificationUsername: {type:String},
            withGrades: {type: Boolean},
            active: {type: Boolean}
        }
    }
})
export default userSchema
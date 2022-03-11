import Utils from "../utils/utils.ts"
import IUser from "../interfaces/user.interface.ts"
export default (await Utils.getDatabaseClient()).database("myFirstDatabase").collection("users");

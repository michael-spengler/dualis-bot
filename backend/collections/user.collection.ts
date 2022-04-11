import Utils from "../utils/utils.ts";
export default (await Utils.getDatabaseClient()).database("myFirstDatabase")
  .collection("users");

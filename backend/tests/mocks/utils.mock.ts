export default class Utils {
    static encrypt(data: string) {
        if(data == "username") {
            return "encrypted"
        }
        
        return "encrypted1";
    }

    static decrypt(data: string) {
        if(data == "username") {
            return "encrypted"
        }
        
        return "encrypted1";
    }

    static notifyUser(user: any, changes: any) {

    }
}
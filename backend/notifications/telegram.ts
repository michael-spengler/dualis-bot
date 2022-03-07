import {IUser} from "../interfaces/user.interface.ts"
import {IDualisCourse} from "../interfaces/dualis.interface.ts"
import {Request} from 'https://deno.land/x/request@1.3.0/request.ts'

export async function sendMessage(targetID: string, message: string) {
    const telegramBotToken = Deno.env.get("TELEGRAM_BOT")
    //sendMessage
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${targetID}&text=${message}&disable_web_page_preview=true`
    console.log(url)
    await Request.get(url)
}

export function getMessageFromChanges(user: IUser, dualisChanges: IDualisCourse[]){
    let message = "Hallo, %0AEs sind folgende neue Bewertungen in Dualis verfügbar:"
    const personalMessage = user.notifications.telegram.withGrades
    // personal Message with Grades and Submodules
    if (personalMessage) { 
        //iterate through all modules with new grades
        for(let i in dualisChanges) {
            message += "%0A"
            const totalModuleObject = dualisChanges[i].examinations;
            //iterate through submodules
            for(let j in totalModuleObject){ 
                const submoduleObject = totalModuleObject[j]
                message += "%0A" + dualisChanges[i].name + " - " + submoduleObject.exam_type + ": " + submoduleObject.grade
            }
        }
    // message without grades
    } else {
        //iterate through modules with new grades
        for(let i in dualisChanges) {
            message += "%0A" + dualisChanges[i].name
        }
    }

    message += "%0AVielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. %0A Besuche " + "WEBSITE" + " für die persönliche Konfiguration."
    console.log(message)
    return message
}
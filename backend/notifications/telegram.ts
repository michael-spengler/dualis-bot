import {IUser} from "../interfaces/user.interface.ts"
import {IDualisCourse} from "../interfaces/dualis.interface.ts"
import {Request} from 'https://deno.land/x/request@1.3.0/request.ts'

export async function sendMessage(targetID: string, message: string) {
    const telegramBotToken = "5154060120:AAG1vr7GrGPgImJ_j8gVRTVdB1btuvsfZdo"
    //sendMessage
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${targetID}&text=${message}&disable_web_page_preview=true`
    await Request.get(url)
}

export function getMessageFromChanges(user: IUser, dualisChanges: IDualisCourse[]){
    let message = "Hallo, '\n'Es sind folgende neue Bewertungen in Dualis verfügbar:"
    const amountGrades = dualisChanges.length
    const personalMessage = user.notifications.telegram.withGrades
    // personal Message with Grades and Submodules
    if (personalMessage) { 
        //iterate through all modules with new grades
        for(let i = 0; i < amountGrades; i++) {
            message += "'\n'"
            const totalModuleObject = dualisChanges[i].examinations;
            //iterate through submodules
            for(let j = 0; j < totalModuleObject.length; j++){ 
                const submoduleObject = totalModuleObject[j]
                message += "'\n'" + dualisChanges[i].name + " - " + submoduleObject.exam_type + ": " + submoduleObject.grade
            }
        }
    // message without grades
    } else {
        //iterate through modules with new grades
        for(let i = 0; i < amountGrades; i++) {
            message += "'\n'" + dualisChanges[i].name
        }
    }

    message += "\nVielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. '/n' Besuche " + "WEBSITE" + " für die persönliche Konfiguration."

    return message
}
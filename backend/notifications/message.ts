import { IDualisCourse } from "../interfaces/dualis.interface.ts";

//generate message from dualis changes (newLineChar for multiply use in discord/telegram,...)
export function getMessageFromChanges(
  dualisChanges: IDualisCourse[],
  withGrades: boolean,
  newLineChar: string,
) {
  let message = "Hallo, " + newLineChar +
    "Es sind folgende neue Bewertungen in Dualis verfügbar:";
  // personal message with grades and submodules
  if (withGrades) {
    //iterate through all modules with new grades
    for (let i in dualisChanges) {
      message += newLineChar;
      const totalModuleObject = dualisChanges[i].examinations;
      //iterate through submodules
      for (let j in totalModuleObject) {
        const submoduleObject = totalModuleObject[j];
        message += newLineChar + dualisChanges[i].name + " - " +
          submoduleObject.exam_type + ": " + submoduleObject.grade;
      }
    }
    // message without grades
  } else {
    //iterate through modules with new grades
    for (let i in dualisChanges) {
      message += newLineChar + dualisChanges[i].name;
    }
  }
  message += newLineChar + newLineChar +
    "Vielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. " +
    newLineChar + "Besuche " + Deno.env.get("WEBSITE") +
    " für die persönliche Konfiguration.";
  return message;
}

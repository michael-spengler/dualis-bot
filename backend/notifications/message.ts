import { IDualisCourse } from "../interfaces/dualis.interface.ts";

//generate message from dualis changes (newLineChar for multiply use in discord/telegram,...)
export function getMessageFromChanges(
  dualisChanges: IDualisCourse[],
  withGrades: boolean,
  newLineChar: string
) {
  let badGrade = false;
  let goodGrade = false;
  const regex = /4,/;
  let message =
    "Hallo, " +
    newLineChar +
    "Es sind folgende neue Bewertungen in Dualis verfügbar:";
  // personal message with grades and submodules
  if (withGrades) {
    //iterate through all modules with new grades
    for (const i in dualisChanges) {
      message += newLineChar;
      const totalModuleObject = dualisChanges[i].examinations;
      //iterate through submodules
      for (const j in totalModuleObject) {
        const submoduleObject = totalModuleObject[j];
        message +=
          newLineChar +
          dualisChanges[i].name +
          " - " +
          submoduleObject.exam_type +
          ": " +
          submoduleObject.grade;
        if (submoduleObject.grade == "1,0") {
          goodGrade = true;
        } else if (regex.test(submoduleObject.grade as string)) {
          badGrade = true;
        }
      }
    }
    // message without grades
  } else {
    //iterate through modules with new grades
    for (const i in dualisChanges) {
      message += newLineChar + dualisChanges[i].name;
    }
  }
  message +=
    newLineChar +
    newLineChar +
    "Vielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. " +
    newLineChar +
    "Besuche " +
    Deno.env.get("WEBSITE") +
    " für die persönliche Konfiguration.";
  return { msg: message, badGrade: badGrade, goodGrade: goodGrade };
}

export function getFirstConfigMessage(
  withGrades: boolean,
  newLineChar: string
) {
  let message = "Konfiguration erfolgreich abgeschlossen!";
  if (withGrades) {
    message +=
      " Sie erhalten über diesen Kommunikationskanal eine persönliche Benachrichtigung mit Ihren neuen Noten.";
  } else {
    message +=
      " Sie erhalten über diesen Kommunikationskanal eine unpersönliche Benachrichtigung bei neuen Noten.";
  }
  message +=
    newLineChar +
    newLineChar +
    "Vielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. " +
    newLineChar +
    "Besuche " +
    Deno.env.get("WEBSITE") +
    " für die persönliche Konfiguration.";
  return message;
}

export function getUpdateConfigMessage(
  withGrades: boolean,
  newLineChar: string
) {
  let message = "Ihre Konfiguration wurde erfogreich geändert!";
  if (withGrades) {
    message +=
      " Sie erhalten über diesen Kommunikationskanal eine persönliche Benachrichtigung mit Ihren neuen Noten.";
  } else {
    message +=
      " Sie erhalten über diesen Kommunikationskanal eine unpersönliche Benachrichtigung bei neuen Noten.";
  }
  message +=
    newLineChar +
    newLineChar +
    "Vielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. " +
    newLineChar +
    "Besuche " +
    Deno.env.get("WEBSITE") +
    " für die persönliche Konfiguration.";
  return message;
}

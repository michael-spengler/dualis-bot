import { assertEquals } from "../../test_deps.ts";
import { getMessageFromChanges } from "../../../notifications/message.ts";

const changeData = [
  {
    name: "Mein erster Kurs",
    examinations: [
      {
        exam_type: "Klausur",
        grade: "4,1",
      },
    ],
  },
];

const changeData2 = [
  {
    name: "Mein erster Kurs",
    examinations: [
      {
        exam_type: "Klausur",
        grade: "1,0",
      },
    ],
  },
];

Deno.test("test message without grades", () => {
  const expected =
    "Hallo, \nEs sind folgende neue Bewertungen in Dualis verfügbar:\nMein erster Kurs\n\nVielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. \nBesuche undefined für die persönliche Konfiguration.";
  const message = getMessageFromChanges(changeData, false, "\n").msg;

  assertEquals(message, expected);
});

Deno.test("test message with grades", () => {
  const expected = 
   "Hallo, \nEs sind folgende neue Bewertungen in Dualis verfügbar:\n\nMein erster Kurs - Klausur: 4,1\n\nVielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. \nBesuche undefined für die persönliche Konfiguration.",
  

  const message = getMessageFromChanges(changeData, true, "\n").msg;

  assertEquals(message, expected);
});

Deno.test("test message with 4,", () => {
  const expected = true;

  const message = getMessageFromChanges(changeData, true, "\n").badGrade;

  assertEquals(message, expected);
});

Deno.test("test message with 1,0", () => {
  const expected = true;

  const message = getMessageFromChanges(changeData2, true, "\n").goodGrade;

  assertEquals(message, expected);
});

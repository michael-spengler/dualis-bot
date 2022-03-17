import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { getMessageFromChanges } from "../../../notifications/message.ts";

const changeData = [{
    "name": "Mein erster Kurs",
    "examinations": [
        {
            "exam_type": "Klausur",
            "grade": "1.2"
        }
    ]
}]

Deno.test("test message without grades", () => {
    const expected = "Hallo, \nEs sind folgende neue Bewertungen in Dualis verfügbar:\nMein erster Kurs\n\nVielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. \nBesuche undefined für die persönliche Konfiguration." 
    const message = getMessageFromChanges(changeData, false, "\n");

    assertEquals(message, expected);
});

Deno.test("test message with grades", () => {
    const expected = "Hallo, \nEs sind folgende neue Bewertungen in Dualis verfügbar:\n\nMein erster Kurs - Klausur: 1.2\n\nVielen Dank für ihr Vertrauen an unseren Service. Der Dualis-Bot hält Sie immer auf dem aktuellen Stand. \nBesuche undefined für die persönliche Konfiguration."
    const message = getMessageFromChanges(changeData, true, "\n");

    assertEquals(message, expected);
});

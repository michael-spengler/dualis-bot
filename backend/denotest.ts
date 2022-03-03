/*
console.log(await fetch("https://dualis.dhbw.de/", {
    headers: {
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15"
    }
}))
*/
//console.log(await fetch("https://dualis.dhbw.de"))

//fetch("https://dualis.dhbw.de/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000324,-Awelcome").then(msg => console.log(msg)).catch(e => console.error(e))
//import ky from 'https://deno.land/x/ky@v0.23.0/index.js';
//import ky from 'https://unpkg.com/ky@0.29.0/distribution/index.js'

//console.log(diff(obj1, obj2));
// [{type: "CREATE", path: ["newProperty"], value: "new"}]
//console.log(diff({hello:"hello"},{hello:"hello"}))
/*
console.log(diff([{
    name: "Mathe",
    exam: [{
        name: "Klausur",
        grade: "1,0"
    }]
}], [{
    name: "Mathe",
    exam: [{
        name: "Klausur",
        grade: "1,0"
    }]
}, {
    name: "Informatik",
    exam: [{
        name: "Portfolio",
        grade: "1,3"
    }]
}]))
*/
import { IDualisExamination, IDualisCourse } from "./interfaces/dualis.interface.ts"
let oldSummary: IDualisCourse[] = [{
    name: "Mathe",
    examinations: [{
        exam_type: "Klausur",
        grade: "not set"
    }]
}]
let newSummary: IDualisCourse[] = [ {
    name: "Informatik",
    examinations: [{
        exam_type: "Portfolio",
        grade: "1,3"
    }]
}]


import { equal } from "https://deno.land/std/testing/asserts.ts";
let differences: IDualisCourse[] = new Array<IDualisCourse>();
for (let newCourse of newSummary) {
    let examinationDifferences: IDualisExamination[] = new Array<IDualisExamination>();
    let courseNew = true;
    for (let oldCourse of oldSummary) {
        
        if (newCourse.name == oldCourse.name) {
            courseNew = false
            for (let newExamination of newCourse.examinations) {
                let examinationNew = true;
                for (let oldExamination of oldCourse.examinations) {
                    console.log("comaring:" + oldExamination.exam_type + newExamination.exam_type)
                    if (compareExaminations(oldExamination, newExamination)) {
                        examinationNew = false;
                    }
                }
                if (examinationNew) {
                    examinationDifferences.push(newExamination)
                }
            }
        }
    }
    if (courseNew) {
        differences.push(newCourse)
    } else if (examinationDifferences.length > 0) {
        differences.push({
            name: newCourse.name,
            examinations: examinationDifferences
        })
    }
}
console.log(differences)
console.log(compareExaminations({
    exam_type: "Klausur",
    grade: "1,0"
}, {
    exam_type: "Klausur",
    grade: "1,1"
}))
function compareExaminations(examination1:IDualisExamination, examination2:IDualisExamination): boolean {
    return examination1.exam_type == examination2.exam_type && examination1.grade == examination2.grade
}











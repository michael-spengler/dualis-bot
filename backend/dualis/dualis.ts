import {
    Bson,
} from "../deps.ts";
import { IDualisExamination, IDualisCourse } from "../interfaces/dualis.interface.ts"
import axiod from "https://deno.land/x/axiod@0.24/mod.ts";
import User from "../interfaces/user.interface.ts"

export async function getDualisSummary(dualis_username: string, dualis_password: string): Promise<IDualisCourse[]> {

    //change when docker compose is finished
    const response = await axiod.post("http://dualis-crawler:8080/scrapedualis", {
        email: dualis_username,
        password: dualis_password
    })

    return response.data

}

export async function getDualisChanges(userId: Bson.ObjectId, newSummary: IDualisCourse[]) {
    const user = await User.findOne({ _id: userId })
    if (!user) {
        throw new Error
    }
    const oldSummary = user.dualisSummary;

    	/*
		compare the differences, so that new Courses and new Examinations and
		changes / updates in the exminations are found
		=> 1. find courses with the same name
		=> 2. check for every Examination of the new course, if it has a
			  deepEqual in the oldCourse, if not, save the examination in the changes
		=> 3. if there are changes on examination level, add the course with the name and
			  the examination changes to the slice of course changes
        => if one of the new courses has no corresponding course in the old entry it is also added
	*/
    const differences: IDualisCourse[] = new Array<IDualisCourse>();
    for (const newCourse of newSummary) {
        const examinationDifferences: IDualisExamination[] = new Array<IDualisExamination>();
        let courseNew = true;
        for (const oldCourse of oldSummary) {

            if (newCourse.name == oldCourse.name) {
                courseNew = false
                for (const newExamination of newCourse.examinations) {
                    let examinationNew = true;
                    for (const oldExamination of oldCourse.examinations) {
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
    return differences;


}

function compareExaminations(examination1: IDualisExamination, examination2: IDualisExamination): boolean {
    return examination1.exam_type == examination2.exam_type && examination1.grade == examination2.grade
}


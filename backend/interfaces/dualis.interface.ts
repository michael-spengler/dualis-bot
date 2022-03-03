export  interface IDualisCourse {
    name: string,
    examinations: IDualisExamination[]
}

export interface IDualisExamination 
    {
        exam_type: string
        grade: string
    }

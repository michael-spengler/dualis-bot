export default interface IDualisCourse {
    name: String
    examinations: [{
        exam_type: String
        grade: String
    }]
}
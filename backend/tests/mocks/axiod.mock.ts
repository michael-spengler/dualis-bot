

export default {
    post: async function(url: string, data: any): Promise<{ data: any}> {
        let response;

        if(url == `http://testhost:8080/scrapedualis`) {
            response = [
                {
                    name: "testkurs",
                    examinations: [
                        {
                            exam_type: "Portfolio",
                            grade: "1,0"
                        }
                    ]
                }
            ]
        }

        return {
            data: response
        };
    }
}
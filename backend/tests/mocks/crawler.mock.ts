import { getPort, opine } from "../test_deps.ts";
import { IDualisCourse } from "../../interfaces/dualis.interface.ts";

export function setupCrawlerMock() {
  const app = opine();
  app.post("/scrapedualis", (req, res) => {
    const response: IDualisCourse[] = [{
      examinations: [{
        exam_type: "Klausur",
        grade: "1,0",
      }],
      name: "Mathematik",
    }];
    res.json(response);
  });
  const port = getPort();
  const server = app.listen(port);
  return port;
}

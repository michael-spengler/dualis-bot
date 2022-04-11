import {
  assert,
  assertEquals,
  assertSpyCall,
  assertSpyCallAsync,
} from "../../test_deps.ts";
import {
  compareExaminations,
  cronjob,
  getDualisChanges,
} from "../../../dualis/dualis.ts";
import { 
  IDualisCourse,
  IDualisExamination,
} from "../../../interfaces/dualis.interface.ts";
import { setupCrawlerMock } from "../../mocks/crawler.mock.ts";
Deno.test("test cronjob", () => {
  assert(true);
});

Deno.test("test getDualisChanges with changing grade", () => {
  const oldCourses: IDualisCourse[] = [{
    examinations: [{
      exam_type: "Klausur",
      grade: "noch nicht gesetzt",
    }],
    name: "Mathematik",
  }];
  const newCourses: IDualisCourse[] = [{
    examinations: [{
      exam_type: "Klausur",
      grade: "1,1",
    }],
    name: "Mathematik",
  }];
  const expected: IDualisCourse[] = [{
    examinations: [{
      exam_type: "Klausur",
      grade: "1,1",
    }],
    name: "Mathematik",
  }];
  assertEquals(getDualisChanges(oldCourses, newCourses), expected);
});
Deno.test("test getDualisChanges with no changes", () => {
  const oldCourses: IDualisCourse[] = [{
    examinations: [{
      exam_type: "Klausur",
      grade: "noch nicht gesetzt",
    }],
    name: "Mathematik",
  }];
  const newCourses: IDualisCourse[] = [{
    examinations: [{
      exam_type: "Klausur",
      grade: "noch nicht gesetzt",
    }],
    name: "Mathematik",
  }];
  const expected: IDualisCourse[] = [];
  assertEquals(getDualisChanges(oldCourses, newCourses), expected);
});
Deno.test("test getDualisChanges with partial changing grade", () => {
  const oldCourses: IDualisCourse[] = [{
    examinations: [{
      exam_type: "Klausur",
      grade: "noch nicht gesetzt",
    }],
    name: "Mathematik",
  }, {
    examinations: [{
      exam_type: "Klausur",
      grade: "noch nicht gesetzt",
    }],
    name: "BWL",
  }];
  const newCourses: IDualisCourse[] = [{
    examinations: [{
      exam_type: "Klausur",
      grade: "1,0",
    }],
    name: "Mathematik",
  }, {
    examinations: [{
      exam_type: "Klausur",
      grade: "noch nicht gesetzt",
    }],
    name: "BWL",
  }];
  const expected: IDualisCourse[] = [{
    examinations: [{
      exam_type: "Klausur",
      grade: "1,0",
    }],
    name: "Mathematik",
  }];
  assertEquals(getDualisChanges(oldCourses, newCourses), expected);
});

Deno.test("test compareExaminations true", () => {
  const examination1: IDualisExamination = {
    exam_type: "Klausur",
    grade: "1,0",
  };
  const examination2: IDualisExamination = {
    exam_type: "Klausur",
    grade: "1,0",
  };
  assert(compareExaminations(examination1, examination2));
});

Deno.test("test compareExaminations false", () => {
  const examination1: IDualisExamination = {
    exam_type: "Klausur",
    grade: "1,1",
  };
  const examination2: IDualisExamination = {
    exam_type: "Klausur",
    grade: "1,0",
  };
  assert(!compareExaminations(examination1, examination2));
});

import { spy } from "../test_deps.ts";

export function get(_url: string) {
  return "someResponseData";
}

export class Request {
  public static get = spy(get);
}

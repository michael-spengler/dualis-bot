import {
    spy,
  } from "https://deno.land/x/mock@0.13.0/mod.ts";

export function get(url: string) {
    return "someResponseData";
}

export class Request {
    public static get = spy(get);
}
import { assertEquals } from "../../test_deps.ts";
import Utils from "../../../utils/utils.ts";

Deno.test("encrypt", () => {
  Deno.env.set("AES_SECRET", "thisissomesupersecretshithideit!");

  assertEquals(
    Utils.encrypt("somesecretshit"),
    "d93757eea53cf23bd810f1d332296912",
  );
});

Deno.test("decrypt", () => {
  Deno.env.set("AES_SECRET", "thisissomesupersecretshithideit!");

  assertEquals(
    Utils.decrypt("d93757eea53cf23bd810f1d332296912"),
    "somesecretshit",
  );
});

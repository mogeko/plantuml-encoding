import { decode, encode } from "@/mod.ts";
import { expect } from "@std/expect";

Deno.test("mod", () => {
  expect(decode(encode("Hello, world!"))).toStrictEqual("Hello, world!");
});

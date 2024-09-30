import { encode } from "@/encode.ts";
import { expect } from "@std/expect";

Deno.test("encode", () => {
  expect(encode("Hello, world!")).toStrictEqual("yqZDoSdNKIZFByf9KGG0");
});

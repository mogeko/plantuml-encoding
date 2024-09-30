import { decode } from "@/decode.ts";
import { expect } from "@std/expect";

Deno.test("decode", () => {
  expect(decode("yqZDoSdNKIZFByf9KGG0")).toStrictEqual("Hello, world!");
});

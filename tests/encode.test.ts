import { encode } from "@/encode.ts";
import { expect } from "@std/expect";

Deno.test("encode", () => {
  expect(encode("Hello, world!")).toStrictEqual("yqZDoSdNKIZFByf9KGG0");

  expect(encode(`@startuml\nA -> B: Hello / 你好'\n@enduml`)).toStrictEqual(
    "SoWkIImgAG00uN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80",
  );
});

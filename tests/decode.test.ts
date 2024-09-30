import { decode } from "@/decode.ts";
import { expect } from "@std/expect";

Deno.test("decode", () => {
  expect(decode("yqZDoSdNKIZFByf9KGG0")).toStrictEqual("Hello, world!");

  expect(
    decode("SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80"),
  ).toStrictEqual(
    `@startuml\nA -> B: Hello / 你好'\n@enduml`,
  );
});

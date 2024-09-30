import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { decode } from "@/decode.ts";

describe("decode", () => {
  it("hello, world", () => {
    expect(decode("yqZDoSdNKIZFByf9KGG0")).toStrictEqual("Hello, world!");
  });

  it("PlantUML code", () => {
    expect(
      decode("SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80"),
    ).toStrictEqual(
      `@startuml\nA -> B: Hello / 你好'\n@enduml`,
    );
  });
});

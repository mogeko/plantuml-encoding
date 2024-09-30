import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { encode } from "@/encode.ts";

describe("encode", () => {
  it("hello, world", () => {
    expect(encode("Hello, world!")).toStrictEqual("yqZDoSdNKIZFByf9KGG0");
  });

  it("PlantUML code", () => {
    expect(
      encode(`@startuml\nA -> B: Hello / 你好'\n@enduml`),
    ).toStrictEqual(
      "SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80",
    );
  });
});

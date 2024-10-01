import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { decode, decode64 } from "@/decode.ts";

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

describe("decode64", () => {
  it(`decode "-" & "_"`, () => {
    expect(
      decode64(new TextEncoder().encode("-_")),
    ).toStrictEqual(
      Uint8Array.of(251, 255, 255),
    );
  });
});

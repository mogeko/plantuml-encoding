import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { encode, encode64 } from "@/encode.ts";

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

describe("encode64", () => {
  it("fixed zreo", () => {
    expect(encode64(Uint8Array.of(1, 2, 3))).toStrictEqual(
      Uint8Array.of(48, 71, 56, 51),
    );

    expect(encode64(Uint8Array.of(1, 2))).toStrictEqual(
      Uint8Array.of(48, 71, 56, 48),
    );

    expect(encode64(Uint8Array.of(1))).toStrictEqual(
      Uint8Array.of(48, 71, 48, 48),
    );
  });
});

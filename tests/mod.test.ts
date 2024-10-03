import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { decode, encode } from "@/mod.ts";

describe("mod", () => {
  it("hello, world", () => {
    expect(decode(encode("Hello, world!"))).toStrictEqual("Hello, world!");
  });

  it("PlantUML code", () => {
    expect(decode(encode(
      `@startuml\nA -> B: Hello / 你好'\n@enduml`,
    ))).toStrictEqual(
      `@startuml\nA -> B: Hello / 你好'\n@enduml`,
    );
  });
});

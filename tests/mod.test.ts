import { decode, encode } from "@/mod.ts";
import { expect } from "@std/expect";

Deno.test("mod", () => {
  expect(decode(encode("Hello, world!"))).toStrictEqual("Hello, world!");

  expect(decode(encode(
    `@startuml\nA -> B: Hello / 你好'\n@enduml`,
  ))).toStrictEqual(
    `@startuml\nA -> B: Hello / 你好'\n@enduml`,
  );
});

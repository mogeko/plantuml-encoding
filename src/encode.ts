// @ts-types="@types/pako"
import { deflateRaw } from "pako";

function encode6bit(b: number) {
  if (b < 10) return 48 + b; // 0-9
  if (b < 36) return 55 + b; // A-Z
  if (b < 62) return 61 + b; // a-z
  if (b === 62) return 45; // -
  if (b === 63) return 95; // _
  return -1;
}

function* encode3bytes(b1: number, b2: number, b3: number) {
  yield encode6bit((b1 >> 2) & 0x3f);
  yield encode6bit((((b1 & 0x3) << 4) | (b2 >> 4)) & 0x3f);
  yield encode6bit((((b2 & 0xf) << 2) | (b3 >> 6)) & 0x3f);
  yield encode6bit(b3 & 0x3f);
}

/**
 * It is used to encode PlantUML code after `deflate` compression.
 *
 * @see {@link https://plantuml.com/en/text-encoding}
 *
 * @param charCodeArray PlantUML code compressed by `deflate` algorithm.
 * @returns The encoded PantUML code.
 *
 * @example Usage
 * ```ts
 * import { encode64 } from "jsr:@mogeko/plantuml-encoding/encode";
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * assertEquals(
 *   encode64(Uint8Array.of(1, 2, 3, 4, 5, 6)),
 *   Uint8Array.of(48, 71, 56, 51, 49, 48, 75, 54)
 * );
 * ```
 */
export function encode64(charCodeArray: Uint8Array): Uint8Array {
  return new Uint8Array((function* (arr) {
    for (let i = 0; i < arr.length; i += 3) {
      if (i + 2 === arr.length) {
        yield* encode3bytes(arr[i], arr[i + 1], 0);
      } else if (i + 1 === arr.length) {
        yield* encode3bytes(arr[i], 0, 0);
      } else {
        yield* encode3bytes(arr[i], arr[i + 1], arr[i + 2]);
      }
    }
  })(charCodeArray));
}

/**
 * Encoding the PantUML code, it can be used to create PlantUML url links.
 *
 * @see {@link https://plantuml.com/en/text-encoding}
 *
 * @param puml The PantUML code.
 * @returns The encoded PantUML code.
 *
 * @example Usage
 * ```ts
 * import { encode } from "jsr:@mogeko/plantuml-encoding/encode";
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * assertEquals(encode("A -> B: Hello"), "SrJGjLDmibBmICt9oGS0");
 * ```
 */
export function encode(puml: string): string {
  return new TextDecoder("utf-8").decode(
    encode64(deflateRaw(puml, { level: 9 })),
  );
}

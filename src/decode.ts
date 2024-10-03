// @ts-types="@types/pako"
import { inflateRaw } from "pako";

function decode6bit(b: number) {
  if (b === 95) return 63; // _
  if (b === 45) return 62; // -
  if (b >= 97) return b - 61; // a-z
  if (b >= 65) return b - 55; // A-Z
  if (b >= 48) return b - 48; // 0-9
  return -1;
}

/**
 * To restore the encoded PlantUML code to its `deflate` compressed form.
 *
 * @see {@link https://plantuml.com/en/text-encoding}
 *
 * @param charCodeArray The encoded PlantUML code.
 * @returns PlantUML code compressed by `deflate` algorithm.
 *
 * @example Usage
 * ```ts
 * import { decode64 } from "jsr:@mogeko/plantuml-encoding/decode";
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * assertEquals(
 *   decode64(Uint8Array.of(48, 71, 56, 51, 49, 48, 75, 54)),
 *   Uint8Array.of(1, 2, 3, 4, 5, 6)
 * );
 * ```
 */
export function decode64(charCodeArray: Uint8Array): Uint8Array {
  return new Uint8Array((function* (arr) {
    for (let i = 0; i < arr.length; i += 4) {
      const c1 = decode6bit(arr[i + 1]), c2 = decode6bit(arr[i + 2]);

      yield decode6bit(arr[i]) << 2 | (c1 >> 4) & 0x3F;
      yield (c1 << 4) & 0xF0 | (c2 >> 2) & 0xF;
      yield (c2 << 6) & 0xC0 | decode6bit(arr[i + 3]) & 0x3F;
    }
  })(charCodeArray));
}

/**
 * Decode the encoded PlantUML code into a version suitable for human reading.
 *
 * @see {@link https://plantuml.com/en/text-encoding}
 *
 * @param cipher The encoded PlantUML code.
 * @returns PlantUML code suitable for human reading.
 *
 * @example Usage
 * ```ts
 * import { decode } from "jsr:@mogeko/plantuml-encoding/decode";
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * assertEquals(decode("SrJGjLDmibBmICt9oGS0"), "A -> B: Hello");
 * ```
 */
export function decode(cipher: string): string {
  return inflateRaw(
    decode64(new TextEncoder().encode(cipher)),
    { to: "string" },
  );
}

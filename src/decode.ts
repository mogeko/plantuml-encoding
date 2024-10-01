import { inflateRaw } from "compress/mod.ts";

function decode6bit(b: number) {
  if (b === 95) return 63; // _
  if (b === 45) return 62; // -
  if (b >= 97) return b - 61; // a-z
  if (b >= 65) return b - 55; // A-Z
  if (b >= 48) return b - 48; // 0-9
  return -1;
}

function* decode4bytes(b1: number, b2: number, b3: number, b4: number) {
  const c1 = decode6bit(b2), c2 = decode6bit(b3);
  yield decode6bit(b1) << 2 | (c1 >> 4) & 0x3F;
  yield (c1 << 4) & 0xF0 | (c2 >> 2) & 0xF;
  yield (c2 << 6) & 0xC0 | decode6bit(b4) & 0x3F;
}

export function decode64(charCodeArray: Uint8Array): Uint8Array {
  return new Uint8Array((function* (arr) {
    for (let i = 0; i < arr.length; i += 4) {
      yield* decode4bytes(arr[i], arr[i + 1], arr[i + 2], arr[i + 3]);
    }
  })(charCodeArray));
}

export function decode(cipher: string): string {
  return new TextDecoder("utf-8").decode(
    inflateRaw(decode64(new TextEncoder().encode(cipher))),
  );
}

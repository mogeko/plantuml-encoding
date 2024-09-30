import { deflateRaw } from "compress/mod.ts";

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

function encode64(charCodeArray: Uint8Array) {
  return new Uint8Array((function* (arr) {
    for (let i = 0; i < arr.length; i += 3) {
      if (arr[i] + 2 === arr.length) {
        yield* encode3bytes(arr[i], arr[i + 1], 0);
      } else if (arr[i] + 1 === arr.length) {
        yield* encode3bytes(arr[i], 0, 0);
      } else {
        yield* encode3bytes(arr[i], arr[i + 1], arr[i + 2]);
      }
    }
  })(charCodeArray));
}

export function encode(puml: string) {
  return new TextDecoder("utf-8").decode(
    encode64(deflateRaw(new TextEncoder().encode(puml))),
  );
}

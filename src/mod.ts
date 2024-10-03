// Copyright (c) 2024 Zheng Junyi. All rights reserved. MIT license.

/**
 * A library for encoding and decoding PlantUML code.
 *
 * ```ts
 * import { decode, encode } from "jsr:@mogeko/plantuml-encoding";
 * import { assertEquals } from "jsr:@std/assert/equals";
 *
 * assertEquals(encode("A -> B: Hello"), "SrJGjLDmibBmICt9oGS0");
 * assertEquals(decode("SrJGjLDmibBmICt9oGS0"), "A -> B: Hello");
 * ```
 *
 * @module
 */

export { decode } from "@/decode.ts";
export { encode } from "@/encode.ts";

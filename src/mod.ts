// Copyright (c) 2024 Zheng Junyi. All rights reserved. MIT license.

/**
 * A library for encoding and decoding PlantUML code.
 *
 * ## Encoding
 *
 * ```ts
 * import { encode } from "jsr:@mogeko/plantuml-encoding";
 *
 * const encoded = encode("A -> B: Hello");
 * console.log(encoded); // SrJGjLDmibBmICt9oGS0
 *
 * const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
 * ```
 *
 * Visit the URL and you will get this flowchart:
 *
 * ![puml](https://www.plantuml.com/plantuml/svg/SrJGjLDmibBmICt9oGS0)
 *
 * ## Decoding
 *
 * ```ts
 * import { decode } from "jsr:@mogeko/plantuml-encoding";
 *
 * const puml = decode("SrJGjLDmibBmICt9oGS0");
 * console.log(puml); // A -> B: Hello
 * ```
 *
 * @module
 */

export { decode } from "@/decode.ts";
export { encode } from "@/encode.ts";

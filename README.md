# plantuml-encoding

[![Test](https://github.com/mogeko/plantuml-encoding/actions/workflows/test.yaml/badge.svg)](https://github.com/mogeko/plantuml-encoding/actions/workflows/test.yaml)
[![codecov](https://codecov.io/gh/mogeko/plantuml-encoding/graph/badge.svg?token=sOSMiP3F42)](https://codecov.io/gh/mogeko/plantuml-encoding)
[![JSR](https://jsr.io/badges/@mogeko/plantuml-encoding)](https://jsr.io/@mogeko/plantuml-encoding)

A Deno library for encoding and decoding PlantUML code.

## Installation

```sh
deno add @mogeko/plantuml-encoding
```

For Node.js users:

```sh
npx jsr add @mogeko/plantuml-encoding
```

## Encoding

```ts
import { encode } from "jsr:@mogeko/plantuml-encoding";

const encoded = encode("A -> B: Hello");
console.log(encoded); // SrJGjLDmibBmICt9oGS0

const url = `https://www.plantuml.com/plantuml/svg/${encoded}`;
```

Visit the URL and you will get this flowchart:

![puml](https://www.plantuml.com/plantuml/svg/SrJGjLDmibBmICt9oGS0)

## Decoding

```ts
import { decode } from "jsr:@mogeko/plantuml-encoding";

const puml = decode("SrJGjLDmibBmICt9oGS0");
console.log(puml); // A -> B: Hello
```

## LICENSE

The code in this project is released under the [MIT License](./LICENSE).

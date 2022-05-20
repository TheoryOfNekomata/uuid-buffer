# uuid-buffer

UUID as a Buffer.

UUIDs are 128-bit values used for identification of entities.
Representing them as strings are expensive since it can incur more than
128 bits. This library will help properly represent UUID values while
still having some utility methods like serialization (i.e. converting
them to string representations), as well as generation according to the
v4 spec.

## Usage

```ts
import { Uuid } from '@theoryofnekomata/uuid-buffer';

const newUuidV4 = Uuid.v4(); // sync

let uuidStr = '1d4a8818-a773-4b52-9b6b-4db8c7fd9bf2';

// this method can accept strings, buffers, and bute arrays
const uuidFromStr = Uuid.from(uuidStr);

```

## License

See LICENSE file for details.
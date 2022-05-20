import { v4 } from 'uuid'

interface UuidProto {
  length: number,
  toString(this: UuidProto): string,
  toJSON(this: UuidProto): string,
}

export class Uuid extends Buffer {
  static STRING_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  private static _toUuidString(this: Uuid, encoding?: string) {
    const thisBuffer = this as unknown as Buffer;

    if (typeof encoding === 'string') {
      const buffer = Buffer.from(thisBuffer);
      return buffer.toString(encoding as BufferEncoding);
    }

    let uuidStr = ''
    for (let i = 0; i < this.length; i += 1) {
      if (
        i === 4
        || i === 6
        || i === 8
        || i === 10
      ) {
        uuidStr += '-'
      }
      uuidStr += thisBuffer[i].toString(16).padStart(2, '0')
    }
    return uuidStr;
  }

  private static _toJSON(this: Uuid) {
    const thisBuffer = this as unknown as Buffer;
    const toUuidString = Uuid._toUuidString.bind(thisBuffer);
    return toUuidString();
  }

  private static _attachMethods(uuid: UuidProto) {
    uuid.toString = Uuid._toUuidString.bind(uuid as unknown as Buffer);
    uuid.toJSON = Uuid._toJSON.bind(uuid as unknown as Buffer);
    uuid.constructor = Uuid;
  }

  static v4(): Uuid {
    const uuidBuffer = Buffer.alloc(16)
    const uuid = v4(null, uuidBuffer) as unknown as UuidProto;
    Uuid._attachMethods(uuid);
    return uuid as unknown as Uuid;
  }

  static from(arg: unknown): Uuid {
    if (typeof arg === 'string') {
      if (Uuid.STRING_PATTERN.test(arg)) {
        const uuidStrStripped = arg.replaceAll('-', '')
        const uuidBytes = [] as number[];
        for (let i = 0; i < 16; i += 1) {
          uuidBytes.push(
            parseInt(`${uuidStrStripped[i * 2]}${uuidStrStripped[i * 2 + 1]}`, 16)
          )
        }
        const uuid = Buffer.from(uuidBytes) as unknown as UuidProto
        Uuid._attachMethods(uuid);
        return uuid as unknown as Buffer;
      }
      throw new TypeError(`Malformed UUID string: ${arg}`);
    }


    if (
      arg instanceof ArrayBuffer
      || arg instanceof Uint8Array
      || arg instanceof Buffer
    ) {
      if (arg.byteLength !== 16) {
        throw new TypeError('Value could not be represented as UUID.');
      }

      const uuid = Buffer.from(arg) as unknown as UuidProto;
      Uuid._attachMethods(uuid);
      return uuid as unknown as Buffer;
    }

    if (Array.isArray(arg)) {
      if (arg.length !== 16) {
        throw new TypeError('Value could not be represented as UUID.');
      }
      const uuid = Buffer.from(arg) as unknown as UuidProto
      Uuid._attachMethods(uuid);
      return uuid as unknown as Buffer;
    }

    throw new TypeError('Invalid argument');
  }

  constructor() {
    super(String.fromCharCode(...new Array(16).fill(0)));
    const thisBuffer = this as unknown as UuidProto;
    Uuid._attachMethods(thisBuffer);
  }
}

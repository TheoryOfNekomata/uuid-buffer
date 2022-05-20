import { describe, it, expect, } from 'vitest';
import { Uuid } from '../src'

describe('uuid-compact', () => {
  describe('Uuid', () => {
    it('should create a default Uuid instance when instantiated', () => {
      const uuid = new Uuid()
      expect(uuid.toString()).toBe('00000000-0000-0000-0000-000000000000')
    })

    describe('v4', () => {
      it('should create a new Uuid instance', () => {
        const uuid = Uuid.v4()
        expect(uuid.toString()).toMatch(Uuid.STRING_PATTERN)
      })
    })

    describe('from', () => {
      it('should parse a string argument', () => {
        const uuid = Uuid.from('00000000-0000-0000-0000-000000000000')
        expect(uuid.toString()).toBe('00000000-0000-0000-0000-000000000000')
      })

      it('should throw an error with malformed string argument', () => {
        expect(() => Uuid.from('Z')).toThrowError(TypeError);
      })

      it('should parse a Uint8Array argument', () => {
        const byteArray = new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
        const uuid = Uuid.from(byteArray)
        expect(uuid.toString()).toBe('00000000-0000-0000-0000-000000000000')
      })

      it('should throw an error with malformed Uint8Array argument', () => {
        expect(() => Uuid.from(new Uint8Array([0]))).toThrowError(TypeError);
      })

      it('should parse an ArrayBuffer argument', () => {
        const byteArray = new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]);
        const arrayBuffer = byteArray.buffer
        const uuid = Uuid.from(arrayBuffer)
        expect(uuid.toString()).toBe('00000000-0000-0000-0000-000000000000')
      })

      it('should throw an error with malformed ArrayBuffer argument', () => {
        expect(() => Uuid.from(new Uint8Array([0]).buffer)).toThrowError(TypeError);
      })

      it('should parse a number array', () => {
        const byteArray = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ]
        const uuid = Uuid.from(byteArray)
        expect(uuid.toString()).toBe('00000000-0000-0000-0000-000000000000')
      })

      it('should throw an error with malformed array argument', () => {
        expect(() => Uuid.from([0])).toThrowError(TypeError);
      })

      it('should parse a buffer', () => {
        const buffer = Buffer.alloc(16).fill(0)
        const uuid = Uuid.from(buffer)
        expect(uuid.toString()).toBe('00000000-0000-0000-0000-000000000000')
      })

      it('should throw an error with malformed buffer argument', () => {
        expect(() => Uuid.from(Buffer.alloc(1).fill(0))).toThrowError(TypeError);
      })
    })

    describe('toJSON', () => {
      it('should return the string representation', () => {
        const uuid = Uuid.from('00000000-0000-0000-0000-000000000000')
        expect(uuid.toJSON()).toBe('00000000-0000-0000-0000-000000000000')
      })
    })

    describe('equals', () => {
      it('should compare two equal values', () => {
        const uuid1 = Uuid.from('00000000-0000-0000-0000-000000000000')
        const uuid2 = Uuid.from('00000000-0000-0000-0000-000000000000')
        expect(uuid1.equals(uuid2)).toBe(true);
      });

      it('should compare two unequal values', () => {
        const uuid1 = Uuid.from('1d4a8818-a773-4b52-9b6b-4db8c7fd9bf2');
        const uuid2 = Uuid.from('00000000-0000-0000-0000-000000000000')
        expect(uuid1.equals(uuid2)).not.toBe(true);
      })
    })
  })
})

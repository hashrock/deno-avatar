export class Random {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(seed = 88675123) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }

  // XorShift
  next() {
    const t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
  }

  nextInt(min: number, max: number) {
    const r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  }
}

export function calcChecksum(str: string) {
  let checksum = 0;
  for (let i = 0; i < str.length; i++) {
    checksum += str.charCodeAt(i);
  }
  return checksum;
}
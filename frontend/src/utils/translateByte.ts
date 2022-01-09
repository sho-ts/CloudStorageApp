/** Byteの単位を変換 */
const translateByte = (byte: number, unit: 'kb' | 'mb' | 'gb' = 'gb'): number => {
  switch(unit) {
    case 'kb':
      return byte / 1024
    case 'mb':
      return byte / 1048576
    case 'gb':
      return byte / 1073741824
  }
}

export default translateByte;
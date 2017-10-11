import ConvertBase from './baseConverter'

export default class OpcodeParser {

  static opcodeList = {
    '0nnn': 'SYS addr',
    '00E0': 'CLS',
    '00EE': 'RET',
    '1nnn': 'JP addr',
    '2nnn': 'CALL addr',
    '3xkk': 'SE Vx, byte',
    '4xkk': 'SNE Vx, byte',
    '5xy0': 'SE Vx, Vy',
    '6xkk': 'LD Vx, byte',
    '7xkk': 'ADD Vx, byte',
    '8xy0': 'LD Vx, Vy',
    '8xy1': 'OR Vx, Vy',
    '8xy2': 'AND Vx, Vy',
    '8xy3': 'XOR Vx, Vy',
    '8xy4': 'ADD Vx, Vy',
    '8xy5': 'SUB Vx, Vy',
    '8xy6': 'SHR Vx {, Vy}',
    '8xy7': 'SUBN Vx, Vy',
    '8xyE': 'SHL Vx {, Vy}',
    '9xy0': 'SNE Vx, Vy',
    'Annn': 'LD I, addr',
    'Bnnn': 'JP V0, addr',
    'Cxkk': 'RND Vx, byte',
    'Dxyn': 'DRW Vx, Vy, nibble',
    'Ex9E': 'SKP Vx',
    'ExA1': 'SKNP Vx',
    'Fx07': 'LD Vx, DT',
    'Fx0A': 'LD Vx, K',
    'Fx15': 'LD DT, Vx',
    'Fx18': 'LD ST, Vx',
    'Fx1E': 'ADD I, Vx',
    'Fx29': 'LD F, Vx',
    'Fx33': 'LD B, Vx',
    'Fx55': 'LD [I], Vx',
    'Fx65': 'LD Vx, [I]'
  }

  static parse (opcode) {
    const operation = opcode & 0xF000
    // const x = (opcode & 0x0F00) >> 8
    // const y = (opcode & 0x00F0) >> 4
    switch (operation) {
      case 0x000:
        switch (opcode) {
          case '00E0':
            return this.opcodeList['00E0']

          case '00EE':
            return this.opcodeList['00EE']

          default:
            return this.opcodeList['0nnn']
        }

      case 0x1000:
        return this.opcodeList['1nnn']

      case 0x2000:
        return this.opcodeList['2nnn']

      case 0x3000:
        return this.opcodeList['3xkk']

      case 0x4000:
        return this.opcodeList['4xkk']

      case 0x5000:
        return this.opcodeList['5xy0']

      case 0x6000:
        return this.opcodeList['6xkk']

      case 0x7000:
        return this.opcodeList['7xkk']

      case 0x8000:
        switch (opcode & 0x000F) {
          case 0x0000:
            return this.opcodeList['8xy0']

          case 0x0001:
            return this.opcodeList['8xy0']

          case 0x0002:
            return this.opcodeList['8xy0']

          case 0x0003:
            return this.opcodeList['8xy0']

          case 0x0004:
            return this.opcodeList['8xy0']

          case 0x0005:
            return this.opcodeList['8xy0']

          case 0x0006:
            return this.opcodeList['8xy0']

          case 0x0007:
            return this.opcodeList['8xy0']

          case 0x000E:
            return this.opcodeList['8xy0']
        }
        return `ERR: Unknown code 0x8000: ${opcode}`

      case 0x9000:
        return this.opcodeList['9xy0']

      case 0xA000:
        return this.opcodeList['Annn']

      case 0xB000:
        return this.opcodeList['Bnnn']

      case 0xC000:
        return this.opcodeList['Cxkk']

      case 0xD000:
        return this.opcodeList['Dxyn']

      case 0xE000:
        switch (opcode & 0x00FF) {
          case 0x009E:
            return this.opcodeList['Ex9E']

          case 0x00A1:
            return this.opcodeList['ExA1']
        }
        return `ERR: Unknown code 0xE000: ${ConvertBase.dec2hex(opcode)}`

      case 0xF000:
        return '0xF000'
    }
  }
}

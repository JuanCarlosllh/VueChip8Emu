import opcodes from './opcodes'
import ConvertBase from './baseConverter'

export default class OpcodeParser {

  static parse (opcode) {
    const operation = opcode & 0xF000
    // const x = (opcode & 0x0F00) >> 8
    // const y = (opcode & 0x00F0) >> 4
    switch (operation) {
      case 0x000:
        switch (opcode) {
          case '00E0':
            return {
              opcode: '0nnn',
              instruction: 'SYS addr',
              execute: () => { return }
            }

          case '00EE':
            return {
              opcode: '00E0',
              instruction: 'CLS',
              description: 'Clear the display.',
              execute: (chip8) => {
                console.error(`00E0 Not implemented`)
              }
            }

          default:
            return opcodes['0nnn']
        }

      case 0x1000:
        return opcodes['1nnn']

      case 0x2000:
        return opcodes['2nnn']

      case 0x3000:
        return opcodes['3xkk']

      case 0x4000:
        return opcodes['4xkk']

      case 0x5000:
        return opcodes['5xy0']

      case 0x6000:
        return opcodes['6xkk']

      case 0x7000:
        return opcodes['7xkk']

      case 0x8000:
        switch (opcode & 0x000F) {
          case 0x0000:
            return opcodes['8xy0']

          case 0x0001:
            return opcodes['8xy0']

          case 0x0002:
            return opcodes['8xy0']

          case 0x0003:
            return opcodes['8xy0']

          case 0x0004:
            return opcodes['8xy0']

          case 0x0005:
            return opcodes['8xy0']

          case 0x0006:
            return opcodes['8xy0']

          case 0x0007:
            return opcodes['8xy0']

          case 0x000E:
            return opcodes['8xy0']
        }
        return `ERR: Unknown code 0x8000: ${opcode}`

      case 0x9000:
        return opcodes['9xy0']

      case 0xA000:
        return opcodes['Annn']

      case 0xB000:
        return opcodes['Bnnn']

      case 0xC000:
        return opcodes['Cxkk']

      case 0xD000:
        return opcodes['Dxyn']

      case 0xE000:
        switch (opcode & 0x00FF) {
          case 0x009E:
            return opcodes['Ex9E']

          case 0x00A1:
            return opcodes['ExA1']
        }
        return `ERR: Unknown code 0xE000: ${ConvertBase.dec2hex(opcode)}`

      case 0xF000:
        return '0xF000'
    }
  }
}

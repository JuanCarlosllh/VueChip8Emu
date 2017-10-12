const opcodes = {
  '0nnn': {
    opcode: '0nnn',
    instruction: 'SYS addr',
    values: {}
  },
  '00E0': {
    opcode: '00E0',
    instruction: 'CLS',
    description: 'Clear the display.',
    execute: (chip8) => {
      console.error(`00E0 Not implemented`)
    }
  },
  '00EE': {
    opcode: '00EE',
    instruction: 'RET',
    execute: (chip8) => {
      console.error(`00EE Not implemented`)
    }
  },
  '1nnn': {
    opcode: '1nnn',
    instruction: 'JP addr',
    execute: (chip8) => {
      console.error(`1nnn Not implemented`)
    }
  },
  '2nnn': {
    opcode: '2nnn',
    instruction: 'CALL addr',
    execute: (chip8) => {
      console.error(`2nnn Not implemented`)
    }
  },
  '3xkk': {
    opcode: '3xkk',
    instruction: 'SE Vx, byte',
    execute: (chip8) => {
      console.error(`3xkk Not implemented`)
    }
  },
  '4xkk': {
    opcode: '4xkk',
    instruction: 'SNE Vx, byte',
    execute: (chip8) => {
      console.error(`4xkk Not implemented`)
    }
  },
  '5xy0': {
    opcode: '5xy0',
    instruction: 'SE Vx, Vy',
    execute: (chip8) => {
      console.error(`5xy0 Not implemented`)
    }
  },
  '6xkk': {
    opcode: '6xkk',
    instruction: 'LD Vx, byte',
    execute: (chip8) => {
      console.error(`6xkk Not implemented`)
    }
  },
  '7xkk': {
    opcode: '7xkk',
    instruction: 'ADD Vx, byte',
    execute: (chip8) => {
      console.error(`7xkk Not implemented`)
    }
  },
  '8xy0': {
    opcode: '8xy0',
    instruction: 'LD Vx, Vy',
    execute: (chip8) => {
      console.error(`8xy0 Not implemented`)
    }
  },
  '8xy1': {
    opcode: '8xy1',
    instruction: 'OR Vx, Vy',
    execute: (chip8) => {
      console.error(`8xy1 Not implemented`)
    }
  },
  '8xy2': {
    opcode: '8xy2',
    instruction: 'AND Vx, Vy',
    execute: (chip8) => {
      console.error(`8xy2 Not implemented`)
    }
  },
  '8xy3': {
    opcode: '8xy3',
    instruction: 'XOR Vx, Vy',
    execute: (chip8) => {
      console.error(`8xy3 Not implemented`)
    }
  },
  '8xy4': {
    opcode: '8xy4',
    instruction: 'ADD Vx, Vy',
    execute: (chip8) => {
      console.error(`8xy4 Not implemented`)
    }
  },
  '8xy5': {
    opcode: '8xy5',
    instruction: 'SUB Vx, Vy',
    execute: (chip8) => {
      console.error(`8xy5 Not implemented`)
    }
  },
  '8xy6': {
    opcode: '8xy6',
    instruction: 'SHR Vx {, Vy}',
    execute: (chip8) => {
      console.error(`8xy6 Not implemented`)
    }
  },
  '8xy7': {
    opcode: '8xy7',
    instruction: 'SUBN Vx, Vy',
    execute: (chip8) => {
      console.error(`8xy7 Not implemented`)
    }
  },
  '8xyE': {
    opcode: '8xyE',
    instruction: 'SHL Vx {, Vy}',
    execute: (chip8) => {
      console.error(`8xyE Not implemented`)
    }
  },
  '9xy0': {
    opcode: '9xy0',
    instruction: 'SNE Vx, Vy',
    execute: (chip8) => {
      console.error(`9xy0 Not implemented`)
    }
  },
  'Annn': {
    opcode: 'Annn',
    instruction: 'LD I, addr',
    execute: (chip8) => {
      console.error(`Annn Not implemented`)
    }
  },
  'Bnnn': {
    opcode: 'Bnnn',
    instruction: 'JP V0, addr',
    execute: (chip8) => {
      console.error(`Bnnn Not implemented`)
    }
  },
  'Cxkk': {
    opcode: 'Cxkk',
    instruction: 'RND Vx, byte',
    execute: (chip8) => {
      console.log(chip8)
      console.error(`Cxkk Not implemented`)
    }
  },
  'Dxyn': {
    opcode: 'Dxyn',
    instruction: 'DRW Vx, Vy, nibble',
    execute: (chip8) => {
      console.error(`Dxyn Not implemented`)
    }
  },
  'Ex9E': {
    opcode: 'Ex9E',
    instruction: 'SKP Vx',
    execute: (chip8) => {
      console.error(`Ex9E Not implemented`)
    }
  },
  'ExA1': {
    opcode: 'ExA1',
    instruction: 'SKNP Vx',
    execute: (chip8) => {
      console.error(`ExA1 Not implemented`)
    }
  },
  'Fx07': {
    opcode: 'Fx07',
    instruction: 'LD Vx, DT',
    execute: (chip8) => {
      console.error(`Fx07 Not implemented`)
    }
  },
  'Fx0A': {
    opcode: 'Fx0A',
    instruction: 'LD Vx, K',
    execute: (chip8) => {
      console.error(`Fx0A Not implemented`)
    }
  },
  'Fx15': {
    opcode: 'Fx15',
    instruction: 'LD DT, Vx',
    execute: (chip8) => {
      console.error(`Fx15 Not implemented`)
    }
  },
  'Fx18': {
    opcode: 'Fx18',
    instruction: 'LD ST, Vx',
    execute: (chip8) => {
      console.error(`Fx18 Not implemented`)
    }
  },
  'Fx1E': {
    opcode: 'Fx1E',
    instruction: 'ADD I, Vx',
    execute: (chip8) => {
      console.error(`Fx1E Not implemented`)
    }
  },
  'Fx29': {
    opcode: 'Fx29',
    instruction: 'LD F, Vx',
    execute: (chip8) => {
      console.error(`Fx29 Not implemented`)
    }
  },
  'Fx33': {
    opcode: 'Fx33',
    instruction: 'LD B, Vx',
    execute: (chip8) => {
      console.error(`Fx33 Not implemented`)
    }
  },
  'Fx55': {
    opcode: 'Fx55',
    instruction: 'LD [I], Vx',
    execute: (chip8) => {
      console.error(`Fx55 Not implemented`)
    }
  },
  'Fx65': {
    opcode: 'Fx65',
    instruction: 'LD Vx, [I]',
    execute: (chip8) => {
      console.error(`Fx65 Not implemented`)
    }
  }
}

export default opcodes

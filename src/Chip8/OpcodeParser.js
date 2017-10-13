// import opcodes from './opcodes'
import ConvertBase from './baseConverter'

export default class OpcodeParser {

  static parse (opcode) {
    const operation = opcode & 0xF000
    const x = (opcode & 0x0F00) >> 8
    const y = (opcode & 0x00F0) >> 4
    switch (operation) {
      case 0x000:
        switch (opcode) {
          case '00E0':
            return {
              opcode: '0nnn',
              instruction: 'CLS',
              description: 'Clear the display.',
              execute: (chip8) => {
                chip8.display.reset()
              }
            }

          case '00EE':
            return {
              opcode: '00E0',
              instruction: 'RET',
              description: 'Return from a subroutine',
              execute: (chip8) => {
                // The interpreter sets the program counter to the address at the top of the stack,
                chip8.pc = chip8.stack[chip8.stack.length - 1]
                // then subtracts 1 from the stack pointer.
                chip8.sp --
              }
            }

          default:
            return {
              opcode: '0nnn',
              instruction: 'SYS addr',
              description: 'Jump to a machine code routine at nnn.',
              execute: (chip8) => {
                // his instruction is only used on the old computers on which Chip-8 was originally implemented.
                // It is ignored by modern interpreters.
                return
              }
            }
        }

      case 0x1000:
        return {
          opcode: '1nnn',
          instruction: 'JP addr',
          description: `Jump to location nnn.`,
          execute: (chip8) => {
            // The interpreter sets the program counter to nnn.
            chip8.pc = opcode & 0x0FFF
          }
        }

      case 0x2000:
        return {
          opcode: '2nnn',
          instruction: 'CALL addr',
          description: `Call subroutine at nnn.`,
          execute: (chip8) => {
            // The interpreter increments the stack pointer,
            chip8.sp ++
            // then puts the current PC on the top of the stack.
            chip8.stack[chip8.stack.length - 1] = chip8.pc
            // The PC is then set to nnn.
            chip8.pc = opcode & 0x0FFF
          }
        }

      case 0x3000:
        return {
          opcode: '3xkk',
          instruction: 'SE Vx, byte',
          description: `Skip next instruction if Vx = kk.`,
          execute: (chip8) => {
            // The interpreter compares register Vx to kk, and if they are equal,
            // increments the program counter by 2.
            if (chip8.v[x] === opcode & 0x00FF) chip8.pc += 2
          }
        }

      case 0x4000:
        return {
          opcode: '4xkk',
          instruction: 'SNE Vx, byte',
          description: `Skip next instruction if Vx != kk.`,
          execute: (chip8) => {
            // The interpreter compares register Vx to kk, and if they are not equal,
            // increments the program counter by 2.
            if (chip8.v[x] !== opcode & 0x00FF) chip8.pc += 2
          }
        }

      case 0x5000:
        return {
          opcode: '5xy0',
          instruction: 'SE Vx, Vy',
          description: `Skip next instruction if Vx = Vy.`,
          execute: (chip8) => {
            // The interpreter compares register Vx to register Vy, and if they are equal,
            // increments the program counter by 2.
            if (chip8.v[x] === chip8.v[y]) chip8.pc += 2
          }
        }

      case 0x6000:
        return {
          opcode: '6xkk',
          instruction: 'LD Vx, byte',
          description: `The interpreter puts the value kk into register Vx.`,
          execute: (chip8) => {
            // The interpreter puts the value kk into register Vx.
            chip8.v[x] = opcode & 0x00FF
          }
        }

      case 0x7000:
        return {
          opcode: '7xkk',
          instruction: 'ADD Vx, byte',
          description: `Set Vx = Vx + kk.`,
          execute: (chip8) => {
            // Adds the value kk to the value of register Vx, then stores the result in Vx.
            chip8.v[x] = chip8.v[x] + (opcode & 0x00FF)
          }
        }

      case 0x8000:
        switch (opcode & 0x000F) {
          case 0x0000:
            return {
              opcode: '8xy0',
              instruction: 'LD Vx, Vy',
              description: `Set Vx = Vy.`,
              execute: (chip8) => {
                // Stores the value of register Vy in register Vx.
                chip8.v[x] = chip8.v[y]
              }
            }

          case 0x0001:
            return {
              opcode: '8xy1',
              instruction: 'OR Vx, Vy',
              description: `Set Vx = Vx OR Vy.`,
              execute: (chip8) => {
                // Performs a bitwise OR on the values of Vx and Vy, then stores the result in Vx.
                // A bitwise OR compares the corrseponding bits from two values, and if either bit is 1,
                // then the same bit in the result is also 1. Otherwise, it is 0.
                chip8.v[x] = chip8.v[x] | chip8.v[y]
              }
            }

          case 0x0002:
            return {
              opcode: '8xy2',
              instruction: 'AND Vx, Vy',
              description: `Set Vx = Vx AND Vy.`,
              execute: (chip8) => {
                // Performs a bitwise AND on the values of Vx and Vy, then stores the result in Vx.
                // A bitwise AND compares the corrseponding bits from two values, and if both bits are 1,
                // then the same bit in the result is also 1. Otherwise, it is 0.
                chip8.v[x] = chip8.v[x] & chip8.v[y]
              }
            }

          case 0x0003:
            return {
              opcode: '8xy3',
              instruction: 'XOR Vx, Vy',
              description: `Set Vx = Vx XOR Vy.`,
              execute: (chip8) => {
                // Performs a bitwise exclusive OR on the values of Vx and Vy, then stores the result in Vx.
                // An exclusive OR compares the corresponding bits from two values, and if the bits are not both the same,
                // then the corresponding bit in the result is set to 1. Otherwise, it is 0.
                chip8.v[x] = chip8.v[x] ^ chip8.v[y]
              }
            }

          case 0x0004:
            return {
              opcode: '8xy4',
              instruction: 'ADD Vx, Vy',
              description: `Set Vx = Vx + Vy, set VF = carry.`,
              execute: (chip8) => {
                // The values of Vx and Vy are added together.
                let sum = chip8.v[x] + chip8.v[y]
                // If the result is greater than 8 bits (i.e., > 255,) VF is set to 1, otherwise 0.
                if (sum > 0xFF) chip8.v[0xf] = 1
                else chip8.v[0xf] = 0
                // Only the lowest 8 bits of the result are kept, and stored in Vx.
                chip8.v[x] = sum & 0xFF
              }
            }

          case 0x0005:
            return {
              opcode: '8xy5',
              instruction: 'SUB Vx, Vy',
              description: `Set Vx = Vx - Vy, set VF = NOT borrow.`,
              execute: (chip8) => {
                // If Vx > Vy, then VF is set to 1, otherwise 0.
                if (chip8.v[x] > chip8.v[y]) chip8.v[0xF] = 1
                else chip8.v[0xF] = 0
                // Then Vy is subtracted from Vx, and the results stored in Vx.
                chip8.v[x] = chip8.v[x] - chip8.v[y]
              }
            }
          case 0x0006:
            return {
              opcode: '8xy6',
              instruction: 'SHR Vx {, Vy}',
              description: `Set Vx = Vx SHR 1.`,
              execute: (chip8) => {
                // If the least-significant bit of Vx is 1, then VF is set to 1, otherwise 0.
                if ((chip8.v[x] & 0x01) === 1) chip8.v[0xF] = 1
                else chip8.v[0xF] = 0
                // Then Vx is divided by 2.
                chip8.v[x] = chip8.v[x] >> 1
              }
            }

          case 0x0007:
            return {
              opcode: '8xy7',
              instruction: 'SUBN Vx, Vy',
              description: `Set Vx = Vy - Vx, set VF = NOT borrow.`,
              execute: (chip8) => {
                // If Vy > Vx, then VF is set to 1, otherwise 0.
                if (chip8.v[y] > chip8.v[x]) chip8.v[0xF] = 1
                else chip8.v[0xF] = 0
                // Then Vx is subtracted from Vy, and the results stored in Vx.
                chip8.v[x] = chip8.v[y] - chip8.v[x]
              }
            }

          case 0x000E:
            return {
              opcode: '8xyE',
              instruction: 'SHL Vx {, Vy }',
              description: `Set Vx = Vx SHL 1.`,
              execute: (chip8) => {
                // If the most-significant bit of Vx is 1, then VF is set to 1, otherwise to 0.
                if (chip8.v[x] & 0x80 === 1) chip8.v[0xF] = 1
                else chip8.v[0xF] = 0
                // Then Vx is multiplied by 2.
                chip8.v[x] = chip8.v[x] << 1
              }
            }
        }
        return `ERR: Unknown code 0x8000: ${opcode}`

      case 0x9000:
        return {
          opcode: '9xy0',
          instruction: 'SNE Vx, Vy',
          description: `Skip next instruction if Vx != Vy.`,
          execute: (chip8) => {
            // The values of Vx and Vy are compared, and if they are not equal,
            // the program counter is increased by 2.
            if (chip8.v[x] !== chip8.v[y]) chip8.pc += 2
          }
        }

      case 0xA000:
        return {
          opcode: 'Annn',
          instruction: 'LD I, addr',
          description: `Set I = nnn.`,
          execute: (chip8) => {
            // The value of register I is set to nnn.
            chip8.i = opcode & 0x0FFF
          }
        }

      case 0xB000:
        return {
          opcode: 'Bnnn',
          instruction: 'JP V0, addr',
          description: `Jump to location nnn + V0.`,
          execute: (chip8) => {
            // The program counter is set to nnn plus the value of V0.
            chip8.pc = (opcode & 0x0FFF) + chip8.v[0]
          }
        }

      case 0xC000:
        return {
          opcode: 'Cxkk',
          instruction: 'RND Vx, byte',
          description: `Set Vx = random byte AND kk.`,
          execute: (chip8) => {
            // The interpreter generates a random number from 0 to 255, which is then ANDed with the value kk.
            const random = Math.floor(Math.random() * 0xFF) & (opcode & 0x00FF)
            // The results are stored in Vx. See instruction 8xy2 for more information on AND.
            chip8.v[x] = random
          }
        }

      case 0xD000:
        return {
          opcode: 'Dxyn',
          instruction: 'DRW Vx, Vy, nibble',
          description: `Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.`,
          execute: (chip8) => {
            // The interpreter reads n bytes from memory, starting at the address stored in I.
            const spriteWidth = 0
            const n = opcode & 0x00F
            const bytes = chip8.memory.slice(chip8.i, chip8.i + n)
            // These bytes are then displayed as sprites on screen at coordinates (Vx, Vy).
            // Sprites are XORed onto the existing screen.
            for (let [byteIndex, byte] of bytes.entries()) {
              for (let bit = 0; bit < spriteWidth; bit++) {
                if ((byte & 0x80) > 0) {
                  let lx = x + bit
                  let ly = y + byteIndex
                  // If the sprite is positioned so part of it is outside the coordinates of the display,
                  // it wraps around to the opposite side of the screen.
                  if (lx > 64) lx = lx - 64
                  else if (lx < 0) lx = 64 + lx

                  if (ly > 32) ly = ly - 32
                  else if (ly < 0) ly = 32 + ly

                  // If this causes any pixels to be erased, VF is set to 1, otherwise it is set to 0.
                  // NOTE: This is a pixel collision detection and it stores the collision result on v[0xF]
                  if (chip8.display.memory[lx][ly] === 1) {
                    chip8.v[0xF] = 1
                  } else {
                    chip8.display.memory[lx][ly] = 1
                  }

                  chip8.display.memory[lx][ly] = 1
                }

                byte = byte << 1
              }
            }
          }
        }

      case 0xE000:
        switch (opcode & 0x00FF) {
          case 0x009E:
            return {
              opcode: 'Ex9E',
              instruction: 'SKP Vx',
              description: `Skip next instruction if key with the value of Vx is pressed.`,
              execute: (chip8) => {
                // Checks the keyboard, and if the key corresponding to the value of Vx is currently
                // in the down position, PC is increased by 2.
                console.error('Keyboad input no implemented')
              }
            }

          case 0x00A1:
            return {
              opcode: 'Ex9E',
              instruction: 'SKNP Vx',
              description: `Skip next instruction if key with the value of Vx is not pressed.`,
              execute: (chip8) => {
                // Checks the keyboard, and if the key corresponding to the value of Vx is currently
                // in the up position, PC is increased by 2.
                console.error('Keyboad input no implemented')
              }
            }
        }
        return `ERR: Unknown code 0xE000: ${ConvertBase.dec2hex(opcode)}`

      case 0xF000:
        switch (opcode & 0x00FF) {
          case '0x0007':
            return {
              opcode: 'Fx07',
              instruction: 'LD Vx, DT',
              description: `Set Vx = delay timer value.`,
              execute: (chip8) => {
                // The value of DT is placed into Vx.
                chip8.v[x] = chip8.delayTimer
              }
            }

          case '0x000A':
            return {
              opcode: 'Fx0A',
              instruction: 'LD Vx, K',
              description: `Wait for a key press, store the value of the key in Vx.`,
              execute: (chip8) => {
                // All execution stops until a key is pressed, then the value of that key is stored in Vx.
                console.error('Keyboad input no implemented')
              }
            }

          case '0x0015':
            return {
              opcode: 'Fx15',
              instruction: 'LD DT, Vx',
              description: `Set delay timer = Vx.`,
              execute: (chip8) => {
                // DT is set equal to the value of Vx.
                chip8.delayTimer = chip8.v[x]
              }
            }

          case '0x0018':
            return {
              opcode: 'Fx18',
              instruction: 'LD ST, Vx',
              description: `Set sound timer = Vx.`,
              execute: (chip8) => {
                // ST is set equal to the value of Vx.
                chip8.soundTimer = chip8.v[x]
              }
            }

          case '0x001E':
            return {
              opcode: 'Fx1E',
              instruction: 'Set I = I + Vx',
              description: `The values of I and Vx are added, and the results are stored in I.`,
              execute: (chip8) => {
                // The values of I and Vx are added, and the results are stored in I.
                chip8.i = chip8.i + chip8.v[x]
              }
            }

          case '0x0029':
            return {
              opcode: 'Fx29',
              instruction: 'LD F, Vx',
              description: `Set I = location of sprite for digit Vx.`,
              execute: (chip8) => {
                // The value of I is set to the location for the hexadecimal sprite corresponding to the value of Vx.
                // See section 2.4, Display, for more information on the Chip- 8 hexadecimal font.
                console.error('Sprite font not implemented')
              }
            }

          case '0x0033':
            return {
              opcode: 'Fx33',
              instruction: 'LD B, Vx',
              description: `Store BCD representation of Vx in memory locations I, I+1, and I+2.`,
              execute: (chip8) => {
                // NOTE: BCD representation means 'Binary-coded decimal' which is a class of binary encodings of decimal
                // numbers where each decimal digit is represented by a fixed number of bits.
                // BCD is normally used when a numeric value is going be displayed on screen

                // The interpreter takes the decimal value of Vx,
                const decimalVx = chip8.v[x] // In js is always decimal
                // and places the hundreds digit in memory at location in I,
                chip8.memory[chip8.i] = parseInt(decimalVx / 100)
                // the tens digit at location I+1,
                chip8.memory[chip8.i + 1] = parseInt(decimalVx % 100 / 10)
                // and the ones digit at location I+2.
                chip8.memory[chip8.i + 2] = decimalVx % 10
              }
            }

          case '0x0055':
            return {
              opcode: 'Fx55',
              instruction: 'LD [I], Vx',
              description: `Store registers V0 through Vx in memory starting at location I.`,
              execute: (chip8) => {
                // The interpreter copies the values of registers V0 through Vx into memory, starting at the address in I.
                for (let i = 0; i <= x; i++) {
                  chip8.memory[chip8.i + i] = chip8.v[i]
                }
              }
            }

          case '0x0065':
            return {
              opcode: 'Fx65',
              instruction: 'LD Vx, [I]',
              description: `Read registers V0 through Vx from memory starting at location I.`,
              execute: (chip8) => {
                // The interpreter reads values from memory starting at location I into registers V0 through Vx.
                for (let i = 0; i <= x; i++) {
                  chip8.v[i] = this.memory[chip8.i + i]
                }
              }
            }
        }
        return `ERR: Unknown code 0x8000: ${opcode}`
    }
  }
}

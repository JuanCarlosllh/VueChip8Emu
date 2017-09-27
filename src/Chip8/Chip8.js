import ConvertBase from './baseConverter'

class chip8 {
  constructor () {
    this.reset()
  }

  reset () {
    // Program counter
    this.pc = 0x200

    // Memory
    this.memory = new Array(4096)

    // Stack
    this.stack = new Array(16)

    // Stack pointer
    this.sp = 0

    // "V" ad "I" registers
    this.v = new Array(16)
    this.i = 0

    // Timers
    this.delayTimer = 0
    this.soundTimer = 0
  }

  // Must be a Uint8Array
  loadProgram (program) {
    console.log(program)

    // Load the program in memory
    // Chip 8 programs start in 0x200 memory location
    let memPosCounter = 0x200
    for (let byte of program) {
      this.memory[memPosCounter] = byte
      memPosCounter++
    }
  }

  step () {
    const opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1]
    this.executeOpcode(opcode)
    this.pc += 2
  }

  executeOpcode (opcode) {
    const instruction = opcode & 0xF000 // first byte
    const x = (opcode & 0x0F00) >> 8
    const y = (opcode & 0x00F0) >> 4

    console.log({
      opcode: ConvertBase.dec2bin(opcode),
      instruction: ConvertBase.dec2bin(instruction),
      x: ConvertBase.dec2bin(x),
      y: ConvertBase.dec2bin(y)
    })
    // console.log(ConvertBase.dec2bin(opcode))
    // console.log(instruction)
    // console.log(ConvertBase.dec2hex(instruction))
  }
}

export default chip8

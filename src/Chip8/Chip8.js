import ConvertBase from './baseConverter'
import OpcodeParse from './OpcodeParser'
import Chip8Display from './Chip8Display'

class chip8 {
  constructor () {
    this.reset()
  }

  reset () {
    // Program counter
    this.pc = 0x200

    // Memory
    this.memory = new Uint8Array(4096)

    // Stack
    this.stack = new Array(16)

    // Stack pointer
    this.sp = 0

    // "V" ad "I" registers
    this.v = new Uint8Array(16)
    this.i = 0

    // Timers
    this.delayTimer = 0
    this.soundTimer = 0

    // Misc chip8 interpreter values
    this.paused = false
    this.lastInstruction = null
  }

  setupDisplat (canvas) {
    // Display
    this.display = new Chip8Display(canvas)
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
    if (!this.paused) {
      const opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1]
      this.executeOpcode(opcode)

      // Timers
      if (this.delayTimer > 0) this.delayTimer -= 1
      if (this.soundTimer > 0) this.soundTimer -= 1
    }
    this.display.draw()
  }

  executeOpcode (opcode) {
    const parsedOpcode = OpcodeParse.parse(opcode)

    console.log('EXECUTE OPCODE')
    console.log(parsedOpcode)
    parsedOpcode.execute(this)
    this.pc += 2

    this.lastOpcode = parsedOpcode
    this.lastOpcode.value = ConvertBase.dec2hex(opcode)
  }
}

export default chip8

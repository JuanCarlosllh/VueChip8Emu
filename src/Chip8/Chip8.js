// import ConvertBase from './baseConverter'
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
    const opcode = this.memory[this.pc] << 8 | this.memory[this.pc + 1]
    this.executeOpcode(opcode)
    this.pc += 2
    this.display.draw()
  }

  executeOpcode (opcode) {
    const parsedOpcode = OpcodeParse.parse(opcode)

    console.log('EXECUTE OPCODE')
    console.log(parsedOpcode)
    parsedOpcode.execute(this)
    // console.log({
    //   opcode: ConvertBase.dec2bin(opcode),
    //   instruction: ConvertBase.dec2bin(instruction),
    //   x: ConvertBase.dec2bin(x),
    //   y: ConvertBase.dec2bin(y)
    // })
  }
}

export default chip8

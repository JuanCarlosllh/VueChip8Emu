import OpcodeParser from './OpcodeParser'

export default class MemoryAnalyzer {
  static getAllUpcodes (memory) {
    // const opcodes = []
    console.log(memory)
    for (let i = 0x200; i < 0xFFF; i += 2) {
      if (memory[i]) {
        const opcode = memory[i] << 8 | memory[i + 1]
        console.log(OpcodeParser.parse(opcode))
      }
    }
  }
}

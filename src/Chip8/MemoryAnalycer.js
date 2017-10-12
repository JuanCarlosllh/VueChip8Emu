import OpcodeParser from './OpcodeParser'

export default class MemoryAnalyzer {
  static getAllUpcodes (memory) {
    for (let i = 0x200; i < 0xFFF; i += 2) {
      const opcode = memory[i] << 8 | memory[i + 1]
      const parsedOpcode = OpcodeParser.parse(opcode)
      if (parsedOpcode.opcode !== '0nnn') console.log(parsedOpcode)
    }
  }
}

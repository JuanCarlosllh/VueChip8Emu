<template>
  <div id="app">
    <h1>Chip 8 emulator</h1>
  </div>
</template>

<script>
import Chip8 from '@/Chip8/Chip8'
import MemoryAnalycer from '@/Chip8/MemoryAnalycer'

export default {
  name: 'app',
  mounted () {
    const chip8 = new Chip8()
    console.log(chip8)
    const room = require('raw-loader!../static/chip8rooms/MERLIN')
    const program = new Buffer(room)
    chip8.loadProgram(program)
    MemoryAnalycer.getAllUpcodes(chip8.memory)
  },
  components: {
  }
}
</script>

<style>
#app {
}
</style>

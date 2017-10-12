<template>
  <div id="app">
    <h1>Chip 8 emulator</h1>
    <canvas ref="display" class="display"></canvas>
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
    const room = require('./lib/binary-loader!../static/chip8rooms/MAZE')
    const program = new Buffer(room)
    chip8.loadProgram(program)
    chip8.setupDisplat(this.$refs.display)
    MemoryAnalycer.getAllUpcodes(chip8.memory)

    chip8.step()
  },
  components: {
  }
}
</script>

<style lang="scss">
#app {

  .display {
    width: 640px;
    height: 320px;
  }
}
</style>

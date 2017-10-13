<template>
  <div id="app">
    <h1>Chip 8 emulator</h1>
    <div class="chip8">
      <div class="chip8__screen">
        <canvas ref="display" class="chip8__screen__display"></canvas>
      </div>
      <div class="chip8__state">
        <ul>
          <li>DT: {{ chip8.delayTimer }} </li>
          <li>ST: {{ chip8.soundTimer }} </li>
          <li>PC: {{ chip8.pc }} </li>
          <li>SP: {{ chip8.sp }} </li>
          <li>V: {{ chip8.v }} </li>
          <li>I: {{ chip8.i }} </li>
        </ul>
      </div>
    </div>
    <button @click="step">Step</button>
    <p>Last Opcode</p>
    <p>{{ chip8.lastOpcode }}</p>
  </div>
</template>

<script>
import Chip8 from '@/Chip8/Chip8'
import MemoryAnalycer from '@/Chip8/MemoryAnalycer'
const chip8 = new Chip8()

export default {
  name: 'app',
  data: function () {
    return {
      chip8: chip8,
      pause: false
    }
  },
  mounted () {
    console.log(this.chip8)
    const room = require('./lib/binary-loader!../static/chip8rooms/MAZE')
    console.log(room)
    const program = Buffer.from(room, 'binary')
    this.chip8.loadProgram(program)
    this.chip8.setupDisplat(this.$refs.display)
    MemoryAnalycer.getAllUpcodes(this.chip8.memory)

    const animloop = () => {
      window.requestAnimFrame(animloop)
      this.chip8.step()
    }
    // animloop()
  },
  components: {
  },
  methods: {
    step: function () {
      this.chip8.step()
    }
  }
}
</script>

<style lang="scss">
#app {

  .chip8 {
    display: flex;

    &__screen {
      &__display {
        width: 640px;
        height: 320px;
      }
    }

    &__state {
      flex: 1;
    }
  }
}
</style>

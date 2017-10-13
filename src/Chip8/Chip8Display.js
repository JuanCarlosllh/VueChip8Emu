export default class Chip8Display {
  constructor (canvas) {
    this.canvas = canvas
    this.context = this.canvas.getContext('2d')
    this.memory = []

    this.displayWidth = 640
    this.displayHeight = 320
    this.pixelWidthScale = this.displayWidth / 64
    this.pixelHeightScale = this.displayHeight / 32
    this.backgroundColor = 'rgba(0, 0, 0, 1)'
    this.foregroundColor = 'rgba(255, 255, 255, 1)'

    this.canvas.width = this.displayWidth
    this.canvas.height = this.displayHeight

    this.reset()
  }

  draw () {
    console.log('draw')
    // Clear screen with background color
    this.context.beginPath()
    this.context.rect(0, 0, 640, 320)
    this.context.fillStyle = this.backgroundColor
    this.context.fill()
    this.context.closePath()

    // Draw memory
    this.memory[0][0] = 1
    this.memory[0][10] = 1
    this.context.beginPath()
    this.context.fillStyle = this.foregroundColor
    for (let x = 0; x < 0x40; x++) {
      for (let y = 0; y < 0x20; y++) {
        if (this.memory[x][y]) {
          this.drawPixel(x, y)
        }
      }
    }
    this.context.fill()
    this.context.closePath()
  }

  reset () {
    this.memory = []
    for (let x = 0; x < 0x40; x++) {
      this.memory[x] = []
      for (let y = 0; y < 0x20; y++) {
        this.memory[x][y] = 0
      }
    }
  }

  drawPixel (x, y) {
    this.context.rect(
      x * this.pixelWidthScale,
      y * this.pixelHeightScale,
      this.pixelWidthScale,
      this.pixelHeightScale)
  }
}

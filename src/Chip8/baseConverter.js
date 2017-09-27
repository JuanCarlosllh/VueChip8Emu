export default class ConvertBase {

  static convert (num) {
    return {
      from: (baseFrom) => {
        return {
          to: (baseTo) => {
            return parseInt(num, baseFrom).toString(baseTo)
          }
        }
      }
    }
  }

  static bin2dec (num) {
    return this.convert(num).from(2).to(10)
  }

  // binary to hexadecimal
  static bin2hex (num) {
    return this.convert(num).from(2).to(16)
  }

  // decimal to binary
  static dec2bin (num) {
    return this.convert(num).from(10).to(2)
  }

  // decimal to hexadecimal
  static dec2hex (num) {
    return this.convert(num).from(10).to(16)
  }

  // hexadecimal to binary
  static hex2bin (num) {
    return this.convert(num).from(16).to(2)
  }

  // hexadecimal to decimal
  static hex2dec (num) {
    return this.convert(num).from(16).to(10)
  }
}

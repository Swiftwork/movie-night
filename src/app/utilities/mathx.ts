/* eslint no-bitwise: 0 */

export class MathX {

  /** Generate a globally unique identifier following RFC4122 version 4 compliant solution. */
  static GUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static ShortID() {
    const a = (Math.random() * 46656) | 0;
    const b = (Math.random() * 46656) | 0;
    return ('000' + a.toString(36)).slice(-3) + ('000' + b.toString(36)).slice(-3);
  }
}

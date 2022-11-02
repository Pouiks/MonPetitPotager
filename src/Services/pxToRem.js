const BASE = 16
const pxToRem = (px) => {
  return Number(px) ? `${px / BASE}rem` : 0
}
export default pxToRem
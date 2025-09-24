export function convertUnitToC(temp: number) {
  let tempInCelcius = Math.round(((temp - 32) * 5) / 9);
  return tempInCelcius;
}

export function generagteRandomEchartCategory(number: number) {
  const result: string[] = [];
  for (let i = 0; i < number; i++) {
    result.push(`Day${i}`);
  }
  return result;
}

export function generateRandomEchartData(number: number) {
  const result: number[] = [];
  for (let i = 0; i < number; i++) {
    result.push(Math.floor(Math.random() * 100));
  }
  return result;
}

export default function parsePrice(str: string | number) {
  if (!str) return 0;
  if (Number(str) > 0.0000001) return Number(str).toFixed(2);
  const num = Number.parseFloat(String(str)).toExponential(2);
  const arr: any = num.split('e-');
  return `0.0{${arr[1] - 2}}${Math.floor(Number(arr[0] * 10))}`
}
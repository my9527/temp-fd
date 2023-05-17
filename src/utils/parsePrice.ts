export default function parsePrice(str: string | number) {
  if (!str) return 0;
  if (Number(str) > 0.0000001) return Number(str).toFixed(8);
  if(Number(str) < 1e-12) return "0.00";
  const num = Number.parseFloat(String(str)).toExponential(4);
  const arr: any = num.split('e-');
  return `0.0{${arr[1] - 1}}${Math.floor(Number(arr[0] * 1000))}`
}
export default function formatAddress(address: string, start = 6, end = 7) {
  if(!address) return '-';
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}
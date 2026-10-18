export interface Stock {
  symbol: string;
  name: string;
  previousClose: number;
  lastPrice: number;
  pe: number;
}

export const sampleStocks: Stock[] = [
  { name: "Apple Inc.", symbol: "AAPL", previousClose: 228.52, lastPrice: 231.4, pe: 34.5 },
  { name: "Microsoft Corp.", symbol: "MSFT", previousClose: 415.1, lastPrice: 409.85, pe: 33.8 },
  { name: "NVIDIA Corp.", symbol: "NVDA", previousClose: 120, lastPrice: 126, pe: 52.1 },
];

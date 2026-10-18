import { formatSignedPercent, percentChange } from "@nasdaq-swipe/finance-core";

export interface StockCardProps {
  name: string;
  symbol: string;
  previousClose: number;
  lastPrice: number;
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function StockCard({ name, symbol, previousClose, lastPrice }: StockCardProps) {
  const change = percentChange(previousClose, lastPrice);

  return (
    <article className="stock-card">
      <h2>
        {name} ({symbol})
      </h2>
      <p>{usd.format(lastPrice)}</p>
      <p>{change === null ? "Change unavailable" : `${formatSignedPercent(change)} today`}</p>
    </article>
  );
}

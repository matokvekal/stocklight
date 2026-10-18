import { useState } from "react";
import { StockCard, type StockCardProps } from "./StockCard";

export interface SwipeDeckProps {
  stocks: StockCardProps[];
}

export function SwipeDeck({ stocks }: SwipeDeckProps) {
  const [index, setIndex] = useState(0);
  const [interested, setInterested] = useState<string[]>([]);

  const current = stocks[index];

  function advance(symbol?: string) {
    if (symbol) {
      setInterested((list) => [...list, symbol]);
    }
    setIndex((i) => i + 1);
  }

  return (
    <section>
      {current ? (
        <>
          <StockCard {...current} />
          <button type="button" onClick={() => advance()}>
            Skip
          </button>
          <button type="button" onClick={() => advance(current.symbol)}>
            Interested
          </button>
        </>
      ) : (
        <p>You've seen all {stocks.length} stocks.</p>
      )}
      <p>Interested: {interested.length > 0 ? interested.join(", ") : "none"}</p>
    </section>
  );
}

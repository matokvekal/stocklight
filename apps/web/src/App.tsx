import { StockCard } from "./StockCard";

export function App() {
  return (
    <main className="home">
      <h1>S&P 500 Swipe</h1>
      <p>Simple stock insights for everyday investors.</p>
      <StockCard name="Apple Inc." symbol="AAPL" previousClose={228.52} lastPrice={231.4} />
    </main>
  );
}

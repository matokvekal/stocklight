import { render, screen } from "@testing-library/react";
import { StockCard } from "./StockCard";

describe("StockCard", () => {
  it("shows the symbol, price and a signed daily gain", () => {
    render(<StockCard name="Apple Inc." symbol="AAPL" previousClose={228.52} lastPrice={231.4} pe={34.5} />);
    expect(screen.getByText(/AAPL/)).toBeInTheDocument();
    expect(screen.getByText("$231.40")).toBeInTheDocument();
    expect(screen.getByText("+1.26% today")).toBeInTheDocument();
  });

  it("shows a minus sign for a loss", () => {
    render(<StockCard name="Test Co." symbol="TST" previousClose={200} lastPrice={190} pe={15} />);
    expect(screen.getByText("-5.00% today")).toBeInTheDocument();
  });

  it("does not crash when the previous close is zero", () => {
    render(<StockCard name="Test Co." symbol="TST" previousClose={0} lastPrice={10} pe={15} />);
    expect(screen.getByText("Change unavailable")).toBeInTheDocument();
  });

  it("shows the P/E value and a sentence comparing it with the market", () => {
    render(<StockCard name="Apple Inc." symbol="AAPL" previousClose={228.52} lastPrice={231.4} pe={34.5} />);
    expect(screen.getByText("P/E 34.5")).toBeInTheDocument();
    expect(screen.getByText(/more expensive than the market average of 20/)).toBeInTheDocument();
  });

  it("says there are no earnings instead of calling a non-positive P/E cheap", () => {
    render(<StockCard name="Test Co." symbol="TST" previousClose={10} lastPrice={10} pe={-3} />);
    expect(screen.getByText(/no earnings/)).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { StockCard } from "./StockCard";

describe("StockCard", () => {
  it("shows the symbol, price and a signed daily gain", () => {
    render(<StockCard name="Apple Inc." symbol="AAPL" previousClose={228.52} lastPrice={231.4} />);
    expect(screen.getByText(/AAPL/)).toBeInTheDocument();
    expect(screen.getByText("$231.40")).toBeInTheDocument();
    expect(screen.getByText("+1.26% today")).toBeInTheDocument();
  });

  it("shows a minus sign for a loss", () => {
    render(<StockCard name="Test Co." symbol="TST" previousClose={200} lastPrice={190} />);
    expect(screen.getByText("-5.00% today")).toBeInTheDocument();
  });

  it("does not crash when the previous close is zero", () => {
    render(<StockCard name="Test Co." symbol="TST" previousClose={0} lastPrice={10} />);
    expect(screen.getByText("Change unavailable")).toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { SwipeDeck } from "./SwipeDeck";
import { sampleStocks } from "./sampleStocks";

async function click(...names: Array<"Skip" | "Interested">) {
  for (const name of names) {
    fireEvent.click(screen.getByRole("button", { name }));
  }
}

describe("SwipeDeck", () => {
  it("shows the first stock and no interests initially", () => {
    render(<SwipeDeck stocks={sampleStocks} />);
    expect(screen.getByText("Apple Inc. (AAPL)")).toBeInTheDocument();
    expect(screen.getByText("$231.40")).toBeInTheDocument();
    expect(screen.getByText("+1.26% today")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Skip" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Interested" })).toBeInTheDocument();
    expect(screen.getByText("Interested: none")).toBeInTheDocument();
  });

  it("records the symbol and advances on Interested", async () => {
    render(<SwipeDeck stocks={sampleStocks} />);
    await click("Interested");
    expect(screen.getByText("Microsoft Corp. (MSFT)")).toBeInTheDocument();
    expect(screen.getByText("$409.85")).toBeInTheDocument();
    expect(screen.getByText("-1.26% today")).toBeInTheDocument();
    expect(screen.getByText("Interested: AAPL")).toBeInTheDocument();
  });

  it("advances on Skip without recording", async () => {
    render(<SwipeDeck stocks={sampleStocks} />);
    await click("Skip", "Interested");
    expect(screen.getByText("NVIDIA Corp. (NVDA)")).toBeInTheDocument();
    expect(screen.getByText("$126.00")).toBeInTheDocument();
    expect(screen.getByText("+5.00% today")).toBeInTheDocument();
    expect(screen.getByText("Interested: MSFT")).toBeInTheDocument();
  });

  it("shows the finished message after the last stock", async () => {
    render(<SwipeDeck stocks={sampleStocks} />);
    await click("Interested", "Skip", "Interested");
    expect(screen.getByText("You've seen all 3 stocks.")).toBeInTheDocument();
    expect(screen.getByText("Interested: AAPL, NVDA")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("article")).not.toBeInTheDocument();
  });
});

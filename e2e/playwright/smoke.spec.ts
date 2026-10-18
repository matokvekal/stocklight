import { test, expect } from "@playwright/test";

test("home page shows S&P 500 Swipe", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "S&P 500 Swipe" })).toBeVisible();
});

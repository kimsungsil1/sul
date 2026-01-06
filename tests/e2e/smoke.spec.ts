import { test, expect } from "@playwright/test";

test("landing page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Birth-Year Liquor Recommender" })).toBeVisible();
  const ageButton = page.getByRole("button", { name: "I am 19+" });
  if (await ageButton.isVisible()) {
    await ageButton.click();
  }
  await expect(page.getByRole("button", { name: "Find recommendations" })).toBeVisible();
});

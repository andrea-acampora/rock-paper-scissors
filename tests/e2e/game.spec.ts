import { test, expect } from "@playwright/test";

test.describe("E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4173/");
  });

  test("Test human vs computer mode", async ({ page }) => {
    const modeSelect = page.locator("#game-mode");
    await expect(modeSelect).toHaveValue("HUMAN_VS_COMPUTER");
  });

  test("test human vs computer game", async ({ page }) => {
    const modeSelect = page.locator("#game-mode");
    await page.locator("#start-btn").click();
    await expect(modeSelect).toBeDisabled();
    const player1Rock = page.locator(
      '#player1-move .move-btn[data-choice="ROCK"]'
    );
    await player1Rock.click();
    const selected = page.locator("#player1-move .move-btn.selected");
    await expect(selected).toHaveAttribute("data-choice", "ROCK");
    const player2Selected = page.locator("#player2-move .move-btn.selected");
    await expect(player2Selected).toBeVisible();
    const resultDiv = page.locator("#result");
    await expect(resultDiv).toBeVisible();
    await expect(resultDiv).not.toHaveText("");
  });

  test("Test computer vs computer game", async ({ page }) => {
    await page.locator("#game-mode").selectOption("COMPUTER_VS_COMPUTER");
    await page.locator("#start-btn").click();
    const resultDiv = page.locator("#result");
    await expect(resultDiv).toBeVisible();
    const player1Selected = page.locator("#player1-move .move-btn.selected");
    const player2Selected = page.locator("#player2-move .move-btn.selected");
    await expect(player1Selected).toBeVisible();
    await expect(player2Selected).toBeVisible();
  });

  test("Test reset game", async ({ page }) => {
    const modeSelect = page.locator("#game-mode");
    await page.locator("#start-btn").click();
    await page.locator('#player1-move .move-btn[data-choice="PAPER"]').click();
    await page.locator("#reset-btn").click();
    await expect(page.locator("#result")).toBeHidden();
    await expect(modeSelect).not.toBeDisabled();
  });
});

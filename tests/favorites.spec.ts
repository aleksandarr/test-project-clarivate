import { test, expect } from '@playwright/test';
import { listEndpointMock } from './listEndpointMock';

const baseUrl = 'http://localhost:5173';

test('favorites checking and unchecking works properly', async ({ page }) => {

  await page.route('**/photos?_page=1&_limit=10', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(listEndpointMock)
    });
  });

  // Navigate to the list page
  await page.goto(baseUrl);
  await page.click('#navigateToListButton');

  // Mark items as favorites
  await page.click('#favoriteButton_1');
  await page.click('#favoriteButton_2');
  await page.click('#favoriteButton_3');

  // Navigate back to the dashboard
  await page.click('#backToDashboardButton');

  // Get the length of the displayed favorite items on the dashboard
  const dashboardListItems = await page.$$('#dashboardListItems .itemWrapper .card');
  const dashboardListItemsLength = dashboardListItems.length;

  // Assert that the length is 3
  await expect(dashboardListItemsLength).toBe(3);

  // Navigate to the list page
  await page.goto(`${baseUrl}/list`);

  // Unmark items as favorites
  await page.click('#favoriteButton_1');
  await page.click('#favoriteButton_2');
  await page.click('#favoriteButton_3');

  // Navigate back to the dashboard
  await page.click('#backToDashboardButton');

  // Get the length of the displayed favorite items on the dashboard
  const dashboardListItemsAfterUnmarking = await page.$$('#dashboardListItems .itemWrapper .card');
  const dashboardListItemsLengthAfterUnmarking = dashboardListItemsAfterUnmarking.length;

  // Assert that the length is 0, indicating an empty favorites list
  await expect(dashboardListItemsLengthAfterUnmarking).toBe(0);
});

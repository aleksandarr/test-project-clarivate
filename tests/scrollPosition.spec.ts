import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:5173';
import { listEndpointMock } from './listEndpointMock';

test('scroll position restoration for list after navigation works properly', async ({ page }) => {

    await page.goto(`${baseUrl}/list`);

    await page.addStyleTag({
        content: 'body { height: 2000px !important; }'
    });

    await page.route('**/photos?_page=1&_limit=10', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(listEndpointMock)
        });
    });


    await page.evaluate(() => {
        window.scrollTo(0, 200);
    });

    const scrollPosition = await page.evaluate(() => {
        return window.pageYOffset;
    });

    await page.click('#backToDashboardButton');
    await page.click('#navigateToListButton');

    await expect(scrollPosition).toBe(200);
});

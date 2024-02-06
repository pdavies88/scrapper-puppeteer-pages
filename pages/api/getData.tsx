import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://roadmap-redis.vercel.app/');

  const allItems = await page.evaluate(() => {
    const inputs = document.querySelectorAll('form.flex.items-center');
    return Array.from(inputs)
      .slice(0, 5)
      .map((input) => {
        const titleElement = input.querySelector('h3');
        const title =
          titleElement instanceof HTMLElement ? titleElement.innerText : '';
        const votesElement = input.querySelector('div');
        const votes =
          votesElement instanceof HTMLElement ? votesElement.innerText : '';
        return { title, votes };
      });
  });

  res.status(200).json(allItems);
};

export default getData;

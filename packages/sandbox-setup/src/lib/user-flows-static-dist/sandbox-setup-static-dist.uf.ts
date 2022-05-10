import { UserFlowContext } from '../../../../cli/src/index';

module.exports = {
  flowOptions: {
    name: 'Sandbox Setup StaticDist',
    config: {
      settings: {
        budgets: undefined
      }
    }
  },
  interactions: async (ctx: UserFlowContext): Promise<void> => {
    const { flow, collectOptions, page } = ctx as any;
    const { url } = collectOptions;
    const testUrl = `${url}`;

    // # Navigation
    await flow.navigate(testUrl);

    // # Timespan
    const btn = '#btn';
    const img = '#img';

    await page.waitForSelector(btn);

    // record timespan
    await flow.startTimespan();

    // relevant interactions
    await page.click(btn);
    await page.waitForSelector(img);

    await flow.endTimespan();

    // # Snapshot
    await flow.snapshot();

  },
  launchOptions: {
    // to be able to run tests in the CLI without chrome popping up (for debugging switch it off)
    headless: false
  }
};

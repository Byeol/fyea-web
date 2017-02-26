import { FyeaWebPage } from './app.po';

describe('fyea-web App', () => {
  let page: FyeaWebPage;

  beforeEach(() => {
    page = new FyeaWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

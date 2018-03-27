import { D3projPage } from './app.po';

describe('d3proj App', () => {
  let page: D3projPage;

  beforeEach(() => {
    page = new D3projPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

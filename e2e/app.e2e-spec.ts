import { ProfangPage } from './app.po';

describe('profang App', () => {
  let page: ProfangPage;

  beforeEach(() => {
    page = new ProfangPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

import { NgTasksPage } from './app.po';

describe('ng-tasks App', () => {
  let page: NgTasksPage;

  beforeEach(() => {
    page = new NgTasksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

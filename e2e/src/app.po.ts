import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateToBase() {
    return browser.get('/');
  }
  toHeader(): ElementFinder {
    return element(by.tagName('<app-nav-bar>'));
  }

}

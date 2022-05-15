import { AppPage } from './app.po';
import { browser, logging, element, By, by, protractor } from 'protractor';


const EC = protractor.ExpectedConditions;

describe('EAuction App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.waitForAngularEnabled(false);
  });

  it('should not load product bid page ', () => {
    page.navigateToBase();
    browser.get('/product-bid/search');
    expect<any>(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'product-bid/search');
  });

  it('should Have navbar with classes', () => {
    page.toHeader();
    expect<any>(element(By.tagName('mat-toolbar')).getAttribute('class')).toEqual(
      'mat-toolbar mat-accent mat-toolbar-single-row'
    );
  });


  it('should have login dialog', () => {
    expect<any>(element(By.tagName('app-login-dialog')).getAttribute('class')).toEqual(
        'ng-star-inserted'
      );
  });

  it('should have login modal to login', async () => {
    browser.driver.switchTo().activeElement();
    browser.sleep(2000);
    const loginButton = element(by.partialButtonText('Login'));
    expect(loginButton.isEnabled()).toBeTruthy();

    element(by.css('input[id="loginEmailId"]')).sendKeys('bruno@email.com');
    element(by.css('input[id="loginPasswordId"]')).sendKeys('bruno');
    expect(loginButton.isEnabled()).toBeTruthy();

    loginButton.click();
    browser.sleep(10000);
    expect<any>(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'product-bid/search');
  });

  it('should have Product dropdwon', () => {
    const drp = element(By.tagName('mat-select'));
    drp.click();
  });

  it('should have product details', () => {
    browser.driver.switchTo().activeElement();
    browser.sleep(2000);
    element(by.cssContainingText('mat-option .mat-option-text','P009fgh')).click();
    const searchButton = element(by.partialButtonText('Get'));
    searchButton.click();
    browser.sleep(2000);
    expect<any>(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'product-bid/search');
    const gridheader = element.all(by.tagName('mat-grid-tile'));
     expect<any>(gridheader.get(2).getText()).toEqual('Product Name');
     expect<any>(gridheader.get(4).getText()).toEqual('Short Description');    
     expect<any>(gridheader.get(6).getText()).toEqual('Detailed Description');
     expect<any>(gridheader.get(8).getText()).toEqual('Category');
     expect<any>(gridheader.get(10).getText()).toEqual('Starting Price');
     expect<any>(gridheader.get(12).getText()).toEqual('Bid End Date');

    expect(element(by.tagName('table'))).toBeTruthy();
    const heading = element.all(by.tagName('th'));
    expect<any>(heading.get(0).getText()).toEqual('Name');
    expect<any>(heading.get(1).getText()).toEqual('Bid Amount');
    expect<any>(heading.get(2).getText()).toEqual('Email');
    expect<any>(heading.get(3).getText()).toEqual('Mobile');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    browser.waitForAngularEnabled(true);
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

});

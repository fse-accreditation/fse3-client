import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBidSearchComponent } from './product-bid-search.component';

describe('ProductBidSearchComponent', () => {
  let component: ProductBidSearchComponent;
  let fixture: ComponentFixture<ProductBidSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBidSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBidSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

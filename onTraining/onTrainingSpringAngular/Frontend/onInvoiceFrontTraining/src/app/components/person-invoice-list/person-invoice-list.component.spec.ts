import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonInvoiceListComponent } from './person-invoice-list.component';

describe('PersonInvoiceListComponent', () => {
  let component: PersonInvoiceListComponent;
  let fixture: ComponentFixture<PersonInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonInvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

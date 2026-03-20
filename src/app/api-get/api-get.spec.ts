import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiGetComponent } from './api-get';

describe('ApiGetComponent', () => {
  let component: ApiGetComponent;
  let fixture: ComponentFixture<ApiGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiGetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiGetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

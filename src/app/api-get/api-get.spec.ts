import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiGet } from './api-get';

describe('ApiGet', () => {
  let component: ApiGet;
  let fixture: ComponentFixture<ApiGet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiGet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiGet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

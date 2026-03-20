import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiPostComponent } from './api-post';

describe('ApiPostComponent', () => {
  let component: ApiPostComponent;
  let fixture: ComponentFixture<ApiPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiPostComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

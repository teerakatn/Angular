import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiPost } from './api-post';

describe('ApiPost', () => {
  let component: ApiPost;
  let fixture: ComponentFixture<ApiPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

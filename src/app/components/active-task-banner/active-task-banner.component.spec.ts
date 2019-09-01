import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTaskBannerComponent } from './active-task-banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ActiveTaskBannerComponent', () => {
  let component: ActiveTaskBannerComponent;
  let fixture: ComponentFixture<ActiveTaskBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveTaskBannerComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTaskBannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

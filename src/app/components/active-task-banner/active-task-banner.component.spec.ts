import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTaskBannerComponent } from './active-task-banner.component';

describe('ActiveTaskBannerComponent', () => {
  let component: ActiveTaskBannerComponent;
  let fixture: ComponentFixture<ActiveTaskBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTaskBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTaskBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

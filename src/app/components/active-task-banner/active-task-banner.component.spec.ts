import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTaskBannerComponent } from './active-task-banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/material.module';

describe('ActiveTaskBannerComponent', () => {
  let component: ActiveTaskBannerComponent;
  let fixture: ComponentFixture<ActiveTaskBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveTaskBannerComponent],
      imports: [HttpClientTestingModule, MaterialModule]
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

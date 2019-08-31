import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

let service: TasksService;

describe('TasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.get(TasksService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an emtpy collection', () => {
    expect(service.taskList).toEqual([]);
  });

  it('should start with an empty active task', () => {
    expect(service.activeTask).toEqual(null);
  });

  it('should start with an initialized emtpy collection observable', () => {
    expect(service.taskList$.getValue()).toEqual([]);
  });
  it('should start with an initialized emtpy active task observable', () => {
    expect(service.activeTask$.getValue()).toEqual(null);
  });
});

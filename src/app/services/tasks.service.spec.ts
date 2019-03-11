import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });

  it('should start with an emtpy collection', () => {
    expect(true).toBe(false);
  });

  it('should start with an initialized emtpy observable', () => {
    expect(true).toBe(false);
  });

  describe('task creation', () => {
    it('should have 1 extra element if one task is added', () => {
      expect(true).toBe(false);
    });
    it('should have one element if task is added and collection was empty', () => {
      expect(true).toBe(false);
    });
    it('should contain the task, after the add process is completed', () => {
      expect(true).toBe(false);
    });
    it('should ignore calls without the required parameters', () => {
      expect(true).toBe(false);
    });
    it('should not creat a task that is not valid', () => {
      expect(true).toBe(false);
    });
    it('should not modify current tasks', () => {
      expect(true).toBe(false);
    });
    it('should allow duplicated tasks', () => {
      expect(true).toBe(false);
    });
    it('should trigger the observable after a new task is added', () => {
      expect(true).toBe(false);
    });
  });

  describe('task update', () => {
    it('should update the task with the fields passed by parameter', () => {
      expect(true).toBe(false);
    });
    it('should not update any other task except the one we requested', () => {
      expect(true).toBe(false);
    });
    it('should only update the fields we passed as parameter, but no others', () => {
      expect(true).toBe(false);
    });
    it('should not update a task that does not exists', () => {
      expect(true).toBe(false);
    });
    it('should ignore properties that cannot be updated', () => {
      expect(true).toBe(false);
    });
    it('should not allow the creation of new properties', () => {
      expect(true).toBe(false);
    });
  });

  describe('task deletion', () => {
    it('should properly delete the task we pass by parameter', () => {
      expect(true).toBe(false);
    });

    it('should contain one less element when deleting a task', () => {
      expect(true).toBe(false);
    });
    it('should not cause an error if trying to delete an empty collection', () => {
      expect(true).toBe(false);
    });
    it('should ONLY delete the task we pass by parameter, the other remains intact', () => {
      expect(true).toBe(false);
    });
    it('should ignore calls without the required parameters', () => {
      expect(true).toBe(false);
    });
    it('should not delete a task that does not exists', () => {
      expect(true).toBe(false);
    });
    it('should trigger the observable after the task is deleted', () => {
      expect(true).toBe(false);
    });
    it('should allow iteration over the collection after a task is deleted i.e. no "holes"', () => {
      expect(true).toBe(false);
    });
  });
});

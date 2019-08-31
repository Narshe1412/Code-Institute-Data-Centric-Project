import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from '../model/ITaskStatus';
import { Task } from '../model/ITask';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let service: TasksService;

describe('TasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.get(TasksService);
    jasmine.clock().install();
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

  describe('task creation', () => {
    it('should have 1 extra element if one task is added', () => {
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      const testTitle2 = 'Test title';
      const testDesc2 = 'Test description';
      const testRef2 = 'AFFG2333';
      const testTitle3 = 'Test title';
      const testDesc3 = 'Test description';
      const testRef3 = 'AFFG2333';
      service.addTask(testTitle, testDesc, testRef);
      expect(service.taskList.length).toBe(1);
      service.addTask(testTitle3, testDesc3, testRef3);
      service.addTask(testTitle2, testDesc2, testRef2);

      expect(service.taskList.length).toBe(3);
    });

    it('should have one element if task is added and collection was empty', () => {
      expect(service.taskList.length).toBe(0);
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';

      service.addTask(testTitle, testDesc, testRef);

      expect(service.taskList.length).toBe(1);
    });

    it('should contain the task, after the add process is completed', done => {
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      service.addTask(testTitle, testRef, testDesc).then(newTask => {
        const expected: Task = {
          id: 'id from db',
          title: testTitle,
          reference: testRef,
          description: testDesc,
          timeWorked: [],
          status: TaskStatus.Todo,
          visible: true
        };
        expect(expected).toEqual(service.taskList[0]);
        done();
      });
    });

    it('should not create a task that is not valid', () => {
      service.addTask(null, null, undefined);

      expect(service.taskList.length).toBe(0);
    });

    it('should not modify current tasks', () => {
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      const expected: Task = {
        id: 'id from db',
        title: testTitle,
        reference: testRef,
        description: testDesc,
        timeWorked: [],
        status: TaskStatus.Todo,
        visible: true
      };

      const testTitle2 = 'Test title 2';
      const testDesc2 = 'Test description 2';
      const testRef2 = 'AFFG2333 2';
      const expected2: Task = {
        id: 'id2 from db',
        title: testTitle2,
        reference: testRef2,
        description: testDesc2,
        timeWorked: [],
        status: TaskStatus.Todo,
        visible: true
      };

      service.addTask(testTitle, testRef, testDesc);
      expect(expected).toEqual(service.taskList[0]);

      service.addTask(testTitle2, testRef2, testDesc2);
      expect(expected).toEqual(service.taskList[0]);
      expect(expected2).toEqual(service.taskList[1]);
    });

    it('should allow duplicated tasks', () => {
      expect(service.taskList.length).toBe(0);

      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      service.addTask(testTitle, testDesc, testRef);
      expect(service.taskList.length).toBe(1);

      service.addTask(testTitle, testDesc, testRef);
      expect(service.taskList.length).toBe(2);
    });

    describe('getID', () => {
      it('should return 1 on initial load', () => {
        const startid = service.getNextId();

        expect(startid).toBe(1);
      });

      it('should return an incremental value based on the amount of tasks created', () => {
        const startid = service.getNextId();
        expect(startid).toBe(1);

        service.addTask('test', 'test', 'test');
        service.addTask('test', 'test', 'test');
        const idafter3calls = service.getNextId();

        expect(idafter3calls).toBe(4);
      });
    });
  });

  describe('task update', () => {
    it('should update the task with the fields passed by parameter', () => {
      service.addTask('test', 'ref', 'desc');
      service.addTask('test2', 'ref2', 'desc2');

      service.updateTaskById('2', { reference: 'NEWREF' });

      expect(service.taskList[1].reference).toBe('NEWREF');
    });

    it('should not update any other task except the one we requested', fakeAsync(() => {
      Promise.all([
        service.addTask('test', 'ref', 'desc'),
        service.addTask('test2', 'ref2', 'desc2')
      ]).then(res => {
        service.updateTaskById(res[1].id, { reference: 'NEWREF' });

        expect(service.taskList[1].reference).toBe('NEWREF');
        expect(service.taskList[0].reference).toBe('ref');
      });
    }));

    it('should only update the fields we passed as parameter, but no others', () => {
      service.addTask('test', 'ref', 'desc');

      service.updateTaskById('1', { reference: 'NEWREF' });

      expect(service.taskList[0].reference).toBe('NEWREF');
      expect(service.taskList[0].description).toBe('desc');
      expect(service.taskList[0].title).toBe('test');
    });

    it('should not update a task that does not exists', () => {
      service.addTask('test', 'ref', 'desc');

      service.updateTaskById('2', { reference: 'NEWREF' });

      expect(service.taskList[0].reference).toBe('ref');
    });

    it('should not update a task if there are no tasks on the system', () => {
      service.updateTaskById('2', { reference: 'NEWREF' });

      expect(service.taskList.length).toBe(0);
    });

    it('should ignore properties that cannot be updated', () => {
      service.addTask('test', 'ref', 'desc');

      service.updateTaskById('1', { id: 5, visible: false, timeWorked: 4 });

      expect(service.taskList[0].id).toBe('1');
      expect(service.taskList[0].visible).toBe(true);
      expect(service.taskList[0].timeWorked).toEqual([]);
    });

    it('should not allow the creation of new properties', () => {
      service.addTask('test', 'ref', 'desc');

      service.updateTaskById('1', { strangeProp: 'NEWREF' });

      // expect(service.taskList[0]).not.toEqual(jasmine.objectContaining({ strangeProp: 'NEWREF' }));
      expect(service.taskList[0].hasOwnProperty('strangeProp')).toBeFalsy();
    });
  });

  describe('task deletion', () => {
    it('should properly delete the task we pass by parameter', () => {
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      const expected: Task = {
        id: 'id from db',
        title: testTitle,
        reference: testRef,
        description: testDesc,
        timeWorked: [],
        status: TaskStatus.Todo,
        visible: true
      };
      service.addTask(testTitle, testRef, testDesc);
      expect(service.taskList.length).toBe(1);

      service.deleteTask(expected);

      expect(service.taskList.length).toBe(0);
    });

    it('should properly delete the task by id', () => {
      const id = '1';
      service.addTask('test', 'ref', 'desc');
      service.addTask('test', 'ref', 'desc');
      service.addTask('test', 'ref', 'desc');

      expect(service.taskList.length).toBe(3);
      service.deleteTaskById(id);
      expect(service.taskList.length).toBe(2);

      const indexlist = service.taskList.map(task => task.id);
      expect(indexlist).not.toContain(id);
    });

    it('should contain one less element when deleting a task', () => {
      service.addTask('test', 'ref', 'desc');
      service.addTask('test', 'ref', 'desc');
      service.addTask('test', 'ref', 'desc');
      expect(service.taskList.length).toBe(3);

      service.deleteTaskById('1');

      expect(service.taskList.length).toBe(2);
    });

    it('should not cause an error if trying to delete an empty collection', () => {
      expect(() => service.deleteTaskById('0')).not.toThrow();
    });

    it('should ONLY delete the task we pass by parameter, the other remains intact', () => {
      service.addTask('test', 'ref', 'desc');
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      const toDelete: Task = {
        id: 'id from db',
        title: testTitle,
        reference: testRef,
        description: testDesc,
        timeWorked: [],
        status: TaskStatus.Todo,
        visible: true
      };
      service.addTask(testTitle, testRef, testDesc);
      service.addTask('test3', 'ref3', 'desc3');

      service.deleteTask(toDelete);

      const emptyResult = service.taskList.find(
        (x: Task) => x.reference === testRef
      );
      expect(emptyResult).toBeFalsy();
      const anyResult = service.taskList.find(
        (x: Task) => x.reference !== testRef
      );
      expect(anyResult).toBeTruthy();
      expect(service.taskList.length).toBe(2);
    });

    it('should ignore calls without the required parameters', () => {
      service.addTask('test3', 'ref3', 'desc3');
      service.addTask('test3', 'ref3', 'desc3');

      service.deleteTask();

      expect(service.taskList.length).toBe(2);
    });

    it('should not delete a task that does not exists', () => {
      service.addTask('test', 'ref', 'desc');
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      const toDelete: Task = {
        id: 'id from db',
        title: testTitle,
        reference: testRef,
        description: testDesc,
        timeWorked: [],
        status: TaskStatus.Todo,
        visible: true
      };
      service.addTask('test3', 'ref3', 'desc3');

      expect(service.taskList.length).toBe(2);
      service.deleteTask(toDelete);
      expect(service.taskList.length).toBe(2);
    });

    it('should allow iteration over the collection after a task is deleted i.e. no "holes"', fakeAsync(() => {
      service.addTask('1', '1', '1');
      service.addTask('2', '2', '2');
      service.addTask('3', '3', '3');

      service.deleteTaskById('1');

      function arrayRunner(el) {
        expect(el).toBeTruthy();
      }
      for (const task of service.taskList) {
        arrayRunner(task);
      }
    }));
  });

  describe('advance task status', () => {
    it('should move task from todo to inprogress', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus('1');
      expect(service.taskList[0].status).toBe(TaskStatus.InProgress);
    });

    it('should move task from inprogress to done', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus('1');
      service.advanceTaskStatus('1');
      expect(service.taskList[0].status).toBe(TaskStatus.Done);
    });

    it('should move task from done to archived', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus('1');
      service.advanceTaskStatus('1');
      service.advanceTaskStatus('1');
      expect(service.taskList[0].status).toBe(TaskStatus.Archived);
    });

    it('should not move a task from archived to a bogus state', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus('1');
      service.advanceTaskStatus('1');
      service.advanceTaskStatus('1');
      service.advanceTaskStatus('1');
      expect(service.taskList[0].status).toBe(TaskStatus.Archived);
    });

    it('should allow to manually pass a task status to update', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus('1', undefined, TaskStatus.Done);
      expect(service.taskList[0].status).toBe(TaskStatus.Done);
    });

    it('should allow to manually pass a string for a task status to update', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus('1', undefined, 'Done');
      expect(service.taskList[0].status).toBe(TaskStatus.Done);
    });
    it('should not allow to manually pass a random string for a task status to update', fakeAsync(() => {
      service.addTask('test', 'test', 'test').then(newTask => {
        service.advanceTaskStatus(newTask.id, undefined, 'dummy');
        expect(service.taskList[0].status).toBe(TaskStatus.Todo);
      });
    }));
  });

  describe('update task status', () => {
    it('should update a task status to the new status provided', () => {
      service.addTask('test', 'test', 'test');
      service.updateTaskStatus('1', TaskStatus.Archived);
      expect(service.taskList[0].status).toBe(TaskStatus.Archived);
    });

    it('should only update the task passed by parameter, not others', () => {
      service.addTask('test', 'test', 'test');
      service.addTask('test', 'test', 'test');
      service.addTask('test', 'test', 'test');
      service.updateTaskStatus('2', TaskStatus.Archived);
      expect(service.taskList[1].status).toBe(TaskStatus.Archived);
      expect(service.taskList[0].status).toBe(TaskStatus.Todo);
      expect(service.taskList[2].status).toBe(TaskStatus.Todo);
    });

    it('should not update a task to an incorrect state', fakeAsync(() => {
      service.addTask('test', 'test', 'test').then(newTask => {
        console.log(newTask);
        service.updateTaskStatus('1', null);
        console.log(service.taskList);
        expect(service.taskList[0].status).toBe(TaskStatus.Todo);
      });
    }));

    it('should not update a non existent task', fakeAsync(() => {
      service.addTask('test', 'test', 'test').then(newTask => {
        service.updateTaskStatus(newTask.id, TaskStatus.Archived);
        expect(service.taskList[0].status).toBe(TaskStatus.Todo);
        expect(service.taskList.length).toBe(1);
      });
    }));
  });

  describe('active task status', () => {
    it('should record an active task when called', fakeAsync(() => {
      service.addTask('new', 'newref', 'newdesc').then(newTask => {
        service.activeTask = newTask;
        expect(service.activeTask).toEqual(newTask);
      });
    }));

    it('should update the observable when task is updated', fakeAsync(() => {
      service.addTask('new', 'newref', 'newdesc').then(newTask => {
        let result;

        service.activeTask$.subscribe((res: Task) => (result = res));
        service.activeTask = newTask;
        tick();
        expect(newTask).toEqual(result);
      });
    }));
  });

  describe('setActiveTaskById', () => {
    it('should update the active task when a valid id is passed', () => {
      const newTask = service.addTask('new', 'newref', 'newdesc');
      const result = service.setActiveTaskById('1');
      expect(result).toBeTruthy();
      expect(service.activeTask).toEqual(newTask);
    });

    it('should return false when the id does not exists', () => {
      const result = service.setActiveTaskById('3');
      expect(result).toBeFalsy();
      expect(service.activeTask).toEqual(null);
    });
  });

  describe('clear active task', () => {
    it('should remove the active task when called', () => {
      service.addTask('new', 'ref', 'desc');
      service.setActiveTaskById('1');

      expect(service.activeTask).toBeTruthy();
      service.removeActiveTask();
      expect(service.activeTask).toBeNull();
    });
    it('should return true if the active task was removed', fakeAsync(() => {
      service.addTask('new', 'ref', 'desc').then(newTask => {
        service.setActiveTaskById(newTask.id);

        expect(service.activeTask).toBeTruthy();
        const result = service.removeActiveTask();
        expect(result).toBe(true);
      });
    }));

    it('should return false if the active task was not removed', () => {
      service.addTask('new', 'ref', 'desc');
      const result = service.removeActiveTask();
      expect(result).toBe(false);
    });
  });

  describe('Record time invested in task functionality', () => {
    describe('add time to task', () => {
      it('should add the time to the task', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask('1', 222);
        expect(service.taskList[0].timeWorked[0]).toEqual({
          amount: 222,
          timestamp: 111111
        });
      });

      it('should not error when adding the time to a non-existent task', () => {
        service.addTimeToTask('9', 3333);
        expect(service.taskList.length).toBe(0);
      });

      it('should convert negative times to positive before adding them', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask('1', -3333);
        expect(service.taskList[0].timeWorked[0]).toEqual({
          amount: 3333,
          timestamp: 111111
        });
      });

      it('should allow to add multiple times to a task', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask('1', -3333);
        service.addTimeToTask('1', 3333);
        service.addTimeToTask('1', 0);
        expect(service.taskList[0].timeWorked.length).toEqual(3);
      });
    });

    describe('get total time from task', () => {
      it('should always display positive time or zero', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask('1', -3333);
        service.addTimeToTask('1', -333);

        expect(service.getTotalTimeFromTask('1')).toBeGreaterThanOrEqual(0);
      });

      it('should return the sum of times recorded for a particular task', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask('1', -3333);
        service.addTimeToTask('1', -1111);
        const total = Math.abs(-3333 - 1111);
        expect(service.getTotalTimeFromTask('1')).toEqual(total);
      });

      it('should display zero for tasks that have no recorded time', () => {
        service.addTask('test', 'test', 'test');
        expect(service.getTotalTimeFromTask('1')).toEqual(0);
      });
    });

    describe('get list of recorded times and dates', () => {
      it('should return an array of times and timestamps', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask('1', -3333);
        service.addTimeToTask('1', -1111);

        expect(service.taskList[0].timeWorked.length).toEqual(2);
        expect(service.taskList[0].timeWorked[0]).toEqual({
          amount: 3333,
          timestamp: 111111
        });
        expect(service.taskList[0].timeWorked[1]).toEqual({
          amount: 1111,
          timestamp: 111111
        });
      });

      it('should return an empty array if task has no recorded times', () => {
        service.addTask('test', 'test', 'test');
        expect(service.taskList[0].timeWorked.length).toEqual(0);
        expect(service.taskList[0].timeWorked).toEqual([]);
      });
    });
  });
});

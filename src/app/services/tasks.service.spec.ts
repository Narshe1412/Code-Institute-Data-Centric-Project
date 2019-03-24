import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { TasksService, Task, TaskStatus } from './tasks.service';

let service: TasksService;
const mockTaskList = [
  {
    id: 0,
    title: 'This is a title',
    reference: '1111',
    description: 'This is a description',
    timeWorked: [
      { amount: 1312000, timestamp: 2321313131 },
      { amount: 1312000, timestamp: 2321313131 },
      { amount: 1312000, timestamp: 2321313131 }
    ]
  },
  {
    id: 1,
    title: 'This is the second title',
    reference: '22ND',
    description: 'This is a new description',
    timeWorked: []
  },
  {
    id: 2,
    title: 'This is the third title',
    reference: '33AF',
    description: 'This is a description',
    timeWorked: [
      { amount: 33, timestamp: 2321313131 },
      { amount: 99, timestamp: 2321313131 },
      { amount: 1113231312, timestamp: 2321313131 }
    ]
  },
  {
    id: 4,
    title: 'This is a new task',
    reference: '33AF',
    description: 'This is a description',
    timeWorked: [
      { amount: 99999, timestamp: Date.now() },
      { amount: 1312000, timestamp: Date.now() },
      { amount: 1312000, timestamp: Date.now() }
    ]
  }
];

describe('TasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
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

  it('should start with an initialized emtpy observable', () => {
    expect(service.taskList$.getValue()).toEqual([]);
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

    it('should contain the task, after the add process is completed', () => {
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      service.addTask(testTitle, testRef, testDesc);

      const expected: Task = {
        id: 1,
        title: testTitle,
        reference: testRef,
        description: testDesc,
        timeWorked: [],
        status: TaskStatus.Todo,
        visible: true
      };
      expect(expected).toEqual(service.taskList[0]);
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
        id: 1,
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
        id: 2,
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

    it('should trigger the observable after a new task is added', () => {
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      const expected: Task = {
        id: 1,
        title: testTitle,
        reference: testRef,
        description: testDesc,
        timeWorked: [],
        status: TaskStatus.Todo,
        visible: true
      };

      service.taskList$.pipe(skip(1)).subscribe((res: Task[]) => expect(expected).toEqual(res[0]));

      service.addTask(testTitle, testRef, testDesc);
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

      service.updateTaskById(2, { reference: 'NEWREF' });

      expect(service.taskList[1].reference).toBe('NEWREF');
    });

    it('should not update any other task except the one we requested', () => {
      service.addTask('test', 'ref', 'desc');
      service.addTask('test2', 'ref2', 'desc2');

      service.updateTaskById(2, { reference: 'NEWREF' });

      expect(service.taskList[1].reference).toBe('NEWREF');
      expect(service.taskList[0].reference).toBe('ref');
    });

    it('should only update the fields we passed as parameter, but no others', () => {
      service.addTask('test', 'ref', 'desc');

      service.updateTaskById(1, { reference: 'NEWREF' });

      expect(service.taskList[0].reference).toBe('NEWREF');
      expect(service.taskList[0].description).toBe('desc');
      expect(service.taskList[0].title).toBe('test');
    });

    it('should not update a task that does not exists', () => {
      service.addTask('test', 'ref', 'desc');

      service.updateTaskById(2, { reference: 'NEWREF' });

      expect(service.taskList[0].reference).toBe('ref');
    });

    it('should not update a task if there are no tasks on the system', () => {
      service.updateTaskById(2, { reference: 'NEWREF' });

      expect(service.taskList.length).toBe(0);
    });

    it('should ignore properties that cannot be updated', () => {
      service.addTask('test', 'ref', 'desc');

      service.updateTaskById(1, { id: 5, visible: false, timeWorked: 4 });

      expect(service.taskList[0].id).toBe(1);
      expect(service.taskList[0].visible).toBe(true);
      expect(service.taskList[0].timeWorked).toEqual([]);
    });

    it('should not allow the creation of new properties', () => {
      service.addTask('test', 'ref', 'desc');

      service.updateTaskById(1, { strangeProp: 'NEWREF' });

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
        id: 1,
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
      const id = 1;
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

      service.deleteTaskById(1);

      expect(service.taskList.length).toBe(2);
    });

    it('should not cause an error if trying to delete an empty collection', () => {
      expect(() => service.deleteTaskById(0)).not.toThrow();
    });

    it('should ONLY delete the task we pass by parameter, the other remains intact', () => {
      service.addTask('test', 'ref', 'desc');
      const testTitle = 'Test title';
      const testDesc = 'Test description';
      const testRef = 'AFFG2333';
      const toDelete: Task = {
        id: 1,
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

      const emptyResult = service.taskList.find((x: Task) => x.reference === testRef);
      expect(emptyResult).toBeFalsy();
      const anyResult = service.taskList.find((x: Task) => x.reference !== testRef);
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
        id: 1,
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

    it('should trigger the observable after the task is deleted', () => {
      service.addTask('1', '2', '3');

      service.taskList$
        .pipe(skip(1))
        .subscribe((res: Task[]) => expect(service.taskList.length).toEqual(0));

      service.deleteTaskById(0);
    });

    it('should allow iteration over the collection after a task is deleted i.e. no "holes"', () => {
      service.addTask('1', '1', '1');
      service.addTask('2', '2', '2');
      service.addTask('3', '3', '3');

      service.deleteTaskById(1);

      function arrayRunner(el) {
        expect(el).toBeTruthy();
      }
      for (const task of service.taskList) {
        arrayRunner(task);
      }
    });
  });

  describe('advance task status', () => {
    it('should move task from todo to inprogress', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus(1);
      expect(service.taskList[0].status).toBe(TaskStatus.InProgress);
    });

    it('should move task from inprogress to done', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus(1);
      service.advanceTaskStatus(1);
      expect(service.taskList[0].status).toBe(TaskStatus.Done);
    });

    it('should move task from done to archived', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus(1);
      service.advanceTaskStatus(1);
      service.advanceTaskStatus(1);
      expect(service.taskList[0].status).toBe(TaskStatus.Archived);
    });

    it('should not move a task from archived to a bogus state', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus(1);
      service.advanceTaskStatus(1);
      service.advanceTaskStatus(1);
      service.advanceTaskStatus(1);
      expect(service.taskList[0].status).toBe(TaskStatus.Archived);
    });

    it('should allow to manually pass a task status to update', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus(1, undefined, TaskStatus.Done);
      expect(service.taskList[0].status).toBe(TaskStatus.Done);
    });

    it('should allow to manually pass a string for a task status to update', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus(1, undefined, 'Done');
      expect(service.taskList[0].status).toBe(TaskStatus.Done);
    });
    it('should not allow to manually pass a random string for a task status to update', () => {
      service.addTask('test', 'test', 'test');
      service.advanceTaskStatus(1, undefined, 'dummy');
      expect(service.taskList[0].status).toBe(TaskStatus.Todo);
    });
  });

  describe('update task status', () => {
    it('should update a task status to the new status provided', () => {
      service.addTask('test', 'test', 'test');
      service.updateTaskStatus(1, TaskStatus.Archived);
      expect(service.taskList[0].status).toBe(TaskStatus.Archived);
    });

    it('should only update the task passed by parameter, not others', () => {
      service.addTask('test', 'test', 'test');
      service.addTask('test', 'test', 'test');
      service.addTask('test', 'test', 'test');
      service.updateTaskStatus(2, TaskStatus.Archived);
      expect(service.taskList[1].status).toBe(TaskStatus.Archived);
      expect(service.taskList[0].status).toBe(TaskStatus.Todo);
      expect(service.taskList[2].status).toBe(TaskStatus.Todo);
    });

    it('should not update a task to an incorrect state', () => {
      service.addTask('test', 'test', 'test');
      service.updateTaskStatus(1, null);
      expect(service.taskList[0].status).toBe(TaskStatus.Todo);
    });

    it('should not update a non existent task', () => {
      service.addTask('test', 'test', 'test');
      service.updateTaskStatus(2, TaskStatus.Archived);
      expect(service.taskList[0].status).toBe(TaskStatus.Todo);
      expect(service.taskList.length).toBe(1);
    });
  });

  describe('Record time invested in task functionality', () => {
    describe('add time to task', () => {
      it('should add the time to the task', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask(1, 222);
        expect(service.taskList[0].timeWorked[0]).toEqual({ amount: 222, timestamp: 111111 });
      });

      it('should not error when adding the time to a non-existent task', () => {
        service.addTimeToTask(9, 3333);
        expect(service.taskList.length).toBe(0);
      });

      it('should convert negative times to positive before adding them', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask(1, -3333);
        expect(service.taskList[0].timeWorked[0]).toEqual({ amount: 3333, timestamp: 111111 });
      });

      it('should allow to add multiple times to a task', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask(1, -3333);
        service.addTimeToTask(1, 3333);
        service.addTimeToTask(1, 0);
        expect(service.taskList[0].timeWorked.length).toEqual(3);
      });
    });

    describe('get total time from task', () => {
      it('should always display positive time or zero', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask(1, -3333);
        service.addTimeToTask(1, -333);

        expect(service.getTotalTimeFromTask(1)).toBeGreaterThanOrEqual(0);
      });

      it('should return the sum of times recorded for a particular task', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask(1, -3333);
        service.addTimeToTask(1, -1111);
        const total = Math.abs(-3333 - 1111);
        expect(service.getTotalTimeFromTask(1)).toEqual(total);
      });

      it('should display zero for tasks that have no recorded time', () => {
        service.addTask('test', 'test', 'test');
        expect(service.getTotalTimeFromTask(1)).toEqual(0);
      });
    });

    describe('get list of recorded times and dates', () => {
      it('should return an array of times and timestamps', () => {
        service.addTask('test', 'test', 'test');
        spyOn(Date, 'now').and.returnValue(111111);
        service.addTimeToTask(1, -3333);
        service.addTimeToTask(1, -1111);

        expect(service.taskList[0].timeWorked.length).toEqual(2);
        expect(service.taskList[0].timeWorked[0]).toEqual({ amount: 3333, timestamp: 111111 });
        expect(service.taskList[0].timeWorked[1]).toEqual({ amount: 1111, timestamp: 111111 });
      });

      it('should return an empty array if task has no recorded times', () => {
        service.addTask('test', 'test', 'test');
        expect(service.taskList[0].timeWorked.length).toEqual(0);
        expect(service.taskList[0].timeWorked).toEqual([]);
      });
    });
  });
});

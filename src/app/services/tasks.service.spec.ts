import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { TasksService, Task } from './tasks.service';

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
        status: 'todo',
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
        status: 'todo',
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
        status: 'todo',
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
        status: 'todo',
        visible: true
      };

      service.taskList$.pipe(skip(1)).subscribe((res: Task[]) => expect(expected).toEqual(res[0]));

      service.addTask(testTitle, testRef, testDesc);
    });

    it('getID should return 1 on initial load', () => {
      const startid = service.getNextId();

      expect(startid).toBe(1);
    });

    it('getID should return an incremental value based on the amount of tasks created', () => {
      const startid = service.getNextId();
      expect(startid).toBe(1);

      service.addTask('test', 'test', 'test');
      service.addTask('test', 'test', 'test');
      const idafter3calls = service.getNextId();

      expect(idafter3calls).toBe(4);
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

      expect(service.taskList[0]).not.toEqual(jasmine.objectContaining({ strangeProp: 'NEWREF' }));
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
        status: 'todo',
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

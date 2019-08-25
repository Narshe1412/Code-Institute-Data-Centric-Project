import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataLayerService } from './data-layer.service';

describe('DataLayerService', () => {
  let httpTestingController: HttpTestingController;
  let service: DataLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataLayerService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DataLayerService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Task } from './tasks.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {
  constructor(private http: HttpClient) {}

  public getAllTasks(): Observable<Task[]> {
    const url = `${env.apiUrl}/tasks`;
    return this.http.get<Task[]>(url);
  }
}

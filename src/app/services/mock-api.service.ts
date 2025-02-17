import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ITask } from "../model/model";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  http = inject(HttpClient);

  getTasks() {
    return this.http.get<{ tasks: ITask[] }>('tasks.json').pipe(
      map(res => res.tasks)
    );
  }
}

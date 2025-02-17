import { Component, inject } from '@angular/core';
import { JsonPipe } from "@angular/common";
import { ListComponent } from "../../components/list/list.component";
import { ListItemComponent } from "../../components/list-item/list-item.component";
import { MockApiService } from "../../services/mock-api.service";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-home',
  imports: [
    JsonPipe,
    ListComponent,
    ListItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  api = inject(MockApiService);
  tasks$$ = toSignal(this.api.getTasks());

}

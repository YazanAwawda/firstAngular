import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TaskComponent } from "./Shared/task/task.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'firstAngular';
}

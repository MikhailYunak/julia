import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent, CheckboxComponent } from '@julia/manager/ui';

@Component({
  imports: [RouterModule, ButtonComponent, CheckboxComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'manager-web';
  protected exampleChecked = signal(false);
}

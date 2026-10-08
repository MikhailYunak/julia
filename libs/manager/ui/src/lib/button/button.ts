import { Component, input } from '@angular/core';

@Component({
  selector: 'julia-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
}

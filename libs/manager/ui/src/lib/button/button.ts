import { Component, input } from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';

@Component({
  selector: 'julia-button',
  imports: [BrnButton],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
  disabled = input(false);
}

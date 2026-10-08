import { Component, input, output } from '@angular/core';
import { BrnCheckbox } from '@spartan-ng/brain/checkbox';

/**
 * Styled wrapper around spartan/ui's headless BrnCheckbox, themed through
 * our own design tokens rather than spartan's bundled Tailwind preset (see
 * tools/check-boundaries.mts commit notes — the two presets redeclare the
 * same theme keys, so importing spartan's preset would silently override
 * shared/design-tokens in manager-web only). Built for the permission
 * checkbox matrix in the roles UI (plan Stage 1.3).
 */
@Component({
  selector: 'julia-checkbox',
  imports: [BrnCheckbox],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class CheckboxComponent {
  checked = input(false);
  disabled = input(false);
  checkedChange = output<boolean>();
}

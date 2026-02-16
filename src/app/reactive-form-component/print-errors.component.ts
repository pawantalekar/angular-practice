import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ntg-om-print-errors',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="control && control.invalid && control.touched" class="error-message">
      <small *ngIf="control.hasError('required')" class="p-error">
        {{ fieldName }} is required.
      </small>
      <small *ngIf="control.hasError('min')" class="p-error">
        {{ fieldName }} must be at least {{ control.getError('min')?.min }}.
      </small>
      <small *ngIf="control.hasError('max')" class="p-error">
        {{ fieldName }} must be at most {{ control.getError('max')?.max }}.
      </small>
    </div>
  `,
    styles: [`
    .error-message {
      margin-top: 0.25rem;
    }
    .p-error {
      color: #e24c4c;
      font-size: 0.875rem;
    }
  `]
})
export class PrintErrorsComponent {
    @Input() control: AbstractControl | null = null;
    @Input() fieldName: string = 'Field';
}

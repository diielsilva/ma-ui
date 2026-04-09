import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-form-field-error-message',
  imports: [MessageModule],
  templateUrl: './form-field-error-message.html',
  styleUrl: './form-field-error-message.css',
})
export class FormFieldErrorMessage {
  field = input.required<FormControl>();
  errors = input.required<string[]>();
  messages = input.required<string[]>();
}

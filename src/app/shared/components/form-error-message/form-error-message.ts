import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-form-error-message',
  imports: [MessageModule],
  templateUrl: './form-error-message.html',
  styleUrl: './form-error-message.css',
})
export class FormErrorMessage {
  message = input.required<string>();
}

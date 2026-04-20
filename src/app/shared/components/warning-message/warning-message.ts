import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-warning-message',
  imports: [MessageModule],
  templateUrl: './warning-message.html',
  styleUrl: './warning-message.css',
})
export class WarningMessage {
  message = input.required<string>();
}

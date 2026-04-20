import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-refresh-page-button',
  imports: [ButtonModule],
  templateUrl: './refresh-page-button.html',
  styleUrl: './refresh-page-button.css',
})
export class RefreshPageButton {
  btnText = input.required<string>();
  isBtnDisabled = input.required<boolean>();
  refreshPage = output<void>();
}

import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-page-container',
  imports: [CardModule, DividerModule],
  templateUrl: './page-container.html',
  styleUrl: './page-container.css',
})
export class PageContainer {
  page = input.required<string>();
}

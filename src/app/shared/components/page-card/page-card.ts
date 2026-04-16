import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-page-card',
  imports: [CardModule, DividerModule],
  templateUrl: './page-card.html',
  styleUrl: './page-card.css',
})
export class PageCard {
  cardTitle = input.required<string>();
}

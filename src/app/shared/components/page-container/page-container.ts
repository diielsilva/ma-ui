import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-page-container',
  imports: [CardModule],
  templateUrl: './page-container.html',
  styleUrl: './page-container.css',
})
export class PageContainer {}

import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { EnrollmentCardData } from '../../types/enrollment-card-data';

@Component({
  selector: 'app-enrollment-card',
  imports: [ButtonModule, DatePipe, PanelModule],
  templateUrl: './enrollment-card.html',
  styleUrl: './enrollment-card.css',
})
export class EnrollmentCard {
  cardData = input.required<EnrollmentCardData>();
  onBtnClick = output<number>();
}

import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { EnrollmentCardData } from '../../types/enrollment-card-data';
import { CpfPipe } from '../../../user/pipes/cpf-pipe';
import { PhonePipe } from '../../../user/pipes/phone-pipe';

@Component({
  selector: 'app-enrollment-card',
  imports: [ButtonModule, CpfPipe, DatePipe, PanelModule, PhonePipe],
  templateUrl: './enrollment-card.html',
  styleUrl: './enrollment-card.css',
})
export class EnrollmentCard {
  cardData = input.required<EnrollmentCardData>();
  onBtnClick = output<number>();
}

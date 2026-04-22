import { Component, inject, OnInit, signal } from '@angular/core';
import { take } from 'rxjs';
import { SessionService } from '../../../security/services/session-service';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { WarningMessage } from '../../../shared/components/warning-message/warning-message';
import { EnrollmentCard } from '../../components/enrollment-card/enrollment-card';
import { EnrollmentService } from '../../services/enrollment-service';
import { Enrollment } from '../../types/enrollment';
import { EnrollmentCardData } from '../../types/enrollment-card-data';
import { EnrollmentType } from '../../types/enrollment-type';
import { ListUserEnrollmentsPageState } from './list-user-enrollments-page-state';

@Component({
  selector: 'app-list-user-enrollments-page',
  imports: [EnrollmentCard, PageCard, WarningMessage],
  templateUrl: './list-user-enrollments-page.html',
  styleUrl: './list-user-enrollments-page.css',
})
export class ListUserEnrollmentsPage implements OnInit {
  private sessionService = inject(SessionService);
  private enrollmentService = inject(EnrollmentService);

  protected pageState = signal(ListUserEnrollmentsPageState.INITIAL);
  protected enrollmentCards = signal<EnrollmentCardData[]>([]);

  ngOnInit() {
    this.findAllEnrollmentsOfTheSessionOwner();
  }

  protected findAllEnrollmentsOfTheSessionOwner() {
    this.pageState.set(ListUserEnrollmentsPageState.INITIAL);
    this.enrollmentCards.set([]);

    this.enrollmentService
      .findAllBelongningToSessionOwner()
      .pipe(take(1))
      .subscribe({
        next: (enrollments: Enrollment[]) => {
          this.pageState.set(ListUserEnrollmentsPageState.LOADED);

          enrollments.forEach((enrollment: Enrollment) => {
            const isBtnVisible =
              this.sessionService.isAnAdminSession() && enrollment.type === EnrollmentType.MANUAL;

            const cardData: EnrollmentCardData = {
              enrollment: enrollment,
              isBtnVisible: isBtnVisible,
            };

            this.enrollmentCards().push(cardData);
          });
        },
      });
  }
}

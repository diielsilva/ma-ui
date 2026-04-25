import { Component, inject, OnInit, signal } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PageCard } from '../../../shared/components/page-card/page-card';
import { RefreshPageButton } from '../../../shared/components/refresh-page-button/refresh-page-button';
import { WarningMessage } from '../../../shared/components/warning-message/warning-message';
import { Page } from '../../../shared/types/page';
import { PageState } from '../../../shared/types/page-state';
import { EnrollmentCard } from '../../components/enrollment-card/enrollment-card';
import { EnrollmentService } from '../../services/enrollment-service';
import { Enrollment } from '../../types/enrollment';
import { EnrollmentCardData } from '../../types/enrollment-card-data';

@Component({
  selector: 'app-list-enrollments-page',
  imports: [EnrollmentCard, PaginatorModule, PageCard, RefreshPageButton, WarningMessage],
  templateUrl: './list-enrollments-page.html',
  styleUrl: './list-enrollments-page.css',
})
export class ListEnrollmentsPage implements OnInit {
  private enrollmentService = inject(EnrollmentService);

  protected pageState = signal(PageState.INITIAL);

  protected enrollmentsPage = signal<Page<EnrollmentCardData>>({
    currentPage: 1,
    totalPages: 1,
    totalElements: 0,
    content: [],
  });

  ngOnInit() {
    this.findAllEnrollments();
  }

  protected findAllEnrollments() {
    this.pageState.set(PageState.INITIAL)
    this.enrollmentsPage().content = [];

    this.enrollmentService.findAll(this.enrollmentsPage().currentPage).subscribe({
      next: (page: Page<Enrollment>) => {
        this.pageState.set(PageState.LOADED);

        page.content.forEach((enrollment) => {
          const cardData: EnrollmentCardData = { enrollment, isBtnVisible: false };

          this.enrollmentsPage().content.push(cardData);
        });

        this.enrollmentsPage().totalElements = page.totalElements;
        this.enrollmentsPage().totalPages = page.totalPages;
      },
    });
  }

  protected handlePageChange(event: PaginatorState) {
    const page = this.convertPageIndexFromZeroToOne(Math.ceil(event.first! / 20));

    this.enrollmentsPage().currentPage = page;

    this.findAllEnrollments();
  }

  private convertPageIndexFromZeroToOne(page: number) {
    return page + 1;
  }
}

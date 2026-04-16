import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpLoadingService {
  private isMakingAHttpRequest = signal(false);

  isLoading = computed(() => this.isMakingAHttpRequest());

  startLoading() {
    this.isMakingAHttpRequest.set(true);
  }

  finishLoading() {
    this.isMakingAHttpRequest.set(false);
  }
}

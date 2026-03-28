import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private state = signal<boolean>(false);
  private isLoading = computed(() => this.state());

  public start() {
    this.state.set(true);
  }

  public stop() {
    this.state.set(false);
  }

  public get loading() {
    return this.isLoading;
  }
}

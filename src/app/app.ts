import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { LoadingService } from './shared/services/loading-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, DialogModule, ProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ma-ui');
  protected loadingService = inject(LoadingService);
}

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { SessionService } from './security/services/session-service';
import { Header } from './shared/components/header/header';
import { HttpLoadingService } from './shared/services/http-loading-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, DialogModule, ProgressSpinnerModule, MenubarModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected httpLoadingService = inject(HttpLoadingService);
  protected sessionService = inject(SessionService);
}

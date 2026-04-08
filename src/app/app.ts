import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { SessionService } from './security/services/session-service';
import { Header } from './shared/components/header/header';
import { LoadingService } from './shared/services/loading-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, DialogModule, ProgressSpinnerModule, MenubarModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected loadingService: LoadingService = inject(LoadingService);
  protected sessionService: SessionService = inject(SessionService);
  protected router: Router = inject(Router);
}

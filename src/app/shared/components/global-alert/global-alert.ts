import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ErrorNotificationService } from '../../../core/services/error-notification.service';

@Component({
  selector: 'app-global-alert',
  templateUrl: './global-alert.html',
  styleUrl: './global-alert.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalAlert {
  private readonly errorNotification = inject(ErrorNotificationService);

  readonly message = computed(() => this.errorNotification.message());

  close(): void {
    this.errorNotification.clear();
  }
}

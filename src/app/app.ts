import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { GlobalAlert } from './shared/components/global-alert/global-alert';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, GlobalAlert],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}

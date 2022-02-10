import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('onCreate', [
      transition('void=>*', [
        style({ backgroundColor: '*' }),
        animate('250ms ease-in', style({ backgroundColor: 'rgba(0,0,0,0.1)' })),
        animate('150ms ease-out', style({ backgroundColor: '*' })),
      ]),
    ]),
  ],
})
export class NewsCardComponent {
  @Input() news!: News;
}

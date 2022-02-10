import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {
  @Input() newsList: News[] = [];

  constructor() {}

  trackBy(index: number, item: News) {
    return item.nid;
  }
}

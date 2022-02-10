import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { News } from 'src/app/models/news';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  @Input() newsList: News[] = [];

  @Output() gotToEnd = new EventEmitter();

  constructor() {}

  loadMore() {
    this.gotToEnd.emit();
  }
}

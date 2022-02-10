import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  ReplaySubject,
  switchMap,
  tap,
} from 'rxjs';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news-service/news-service.service';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePageComponent implements OnInit {
  newsByPages$!: Observable<News[][]>;

  news$!: Observable<News[]>;

  listEnded$!: Observable<boolean>;

  pages$ = new BehaviorSubject<number[]>([447]);

  pagesCache: Observable<News[]>[] = [];

  loading$ = new ReplaySubject(1);

  autoload = true;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.connectToNewsByPagesStreams();
    this.connectToNewsStream();
    this.connectToEndOfListStream();
  }

  loadNextPage = () => {
    const currentPages = [...this.pages$.value];
    const [currentPage] = currentPages.slice(-1);
    const nextPage = currentPage + 1;
    const newPagesValue = [...currentPages, nextPage];
    this.pages$.next(newPagesValue);
  };

  private connectToNewsByPagesStreams() {
    this.newsByPages$ = this.pages$.pipe(
      tap(() => this.loading$.next(true)),
      switchMap((pages) =>
        combineLatest(
          pages.map((page) => this.getfromCacheOrFetchNewPage(page))
        )
      ),
      tap(() => this.loading$.next(false))
    );
  }

  private connectToNewsStream() {
    this.news$ = this.newsByPages$.pipe(
      map((streamResults) => streamResults.flat())
    );
  }

  private connectToEndOfListStream() {
    this.listEnded$ = this.newsByPages$.pipe(
      map((pages) =>
        pages.reduce<boolean>((acc, curr) => (acc ||= curr.length < 20), false)
      )
    );
  }

  private getfromCacheOrFetchNewPage(page: number) {
    return (this.pagesCache[page] =
      this.pagesCache[page] || this.newsService.list(page));
  }
}

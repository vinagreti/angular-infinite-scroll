import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { News } from 'src/app/models/news';

const NEWS_API = 'http://www.pinkvilla.com/photo-gallery-feed-page/page/{page}';

export interface NewsApiResponse {
  nodes: NewsApiResponseNode[];
}

export interface NewsApiResponseNode {
  node: News;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  list(page: number = 0): Observable<News[]> {
    const url = NEWS_API.replace('{page}', `${page}`);
    return this.http.get<NewsApiResponse>(url).pipe(
      map((response) => response.nodes.map((item) => item.node)),
      shareReplay()
    );
  }
}

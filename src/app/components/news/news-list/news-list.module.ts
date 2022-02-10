import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list.component';
import { NewsCardModule } from '../news-card/news-card.module';



@NgModule({
  declarations: [
    NewsListComponent
  ],
  imports: [
    CommonModule,
    NewsCardModule
  ],
  exports: [
    NewsListComponent
  ]
})
export class NewsListModule { }

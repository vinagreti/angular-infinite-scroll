import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { NewsListModule } from '../news/news-list/news-list.module';



@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
    CommonModule,
    NewsListModule
  ],
  exports: [
    TimelineComponent
  ]
})
export class TimelineModule { }

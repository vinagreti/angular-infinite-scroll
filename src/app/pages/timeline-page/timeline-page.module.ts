import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimelineModule } from 'src/app/components/timeline/timeline.module';
import { InViewDirective } from 'src/app/directives/in-view.directive';
import { NewsServiceModule } from 'src/app/services/news-service/news-service.module';
import { TimelinePageRoutingModule } from './timeline-page-routing.module';
import { TimelinePageComponent } from './timeline-page.component';

@NgModule({
  declarations: [TimelinePageComponent, InViewDirective],
  imports: [
    CommonModule,
    TimelinePageRoutingModule,
    TimelineModule,
    NewsServiceModule,
  ],
})
export class TimelinePageModule {}

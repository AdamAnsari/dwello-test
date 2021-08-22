import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CommentsComponent } from '../comments/comments.component';

@NgModule({
  declarations: [CommentsComponent],
  imports: [CommonModule, HomeRoutingModule],
  exports: [CommentsComponent],
})
export class HomeModule {}

import { Component, OnInit } from '@angular/core';
import { RedditApiService } from 'src/app/services/reddit-api.service';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';

interface posts {
  title: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  content: any;
  data: posts[] = [];

  constructor(
    private redditApiService: RedditApiService,
    private commS: CommonServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.redditApiService.getData().subscribe((res: any) => {
      this.content = { ...res };
      this.content.data.children.forEach((element, index) => {
        this.data.push(element.data.title);
      });
      console.log(this.data);
      this.commS.getPostData(this.data);
    });
  }

  customEvent(event, index) {
    console.log(event, index);
    this.router
      .navigate(['/posts/details/' + index], { state: { example: index } })
      .then((success) => console.log('navigation success?', success))
      .catch(console.error);
  }
}

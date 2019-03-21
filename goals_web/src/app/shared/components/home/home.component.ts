import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageSources = ['http://media4.s-nbcnews.com/i/MSNBC/Components/Video/201708/b_bw_RossenBeachOTT_170815.jpg',
    // tslint:disable-next-line:max-line-length
    'https://www.oneandonlyresorts.com/-/media/oneandonly/reethi-rah/cuisine/beach-club/detail/1440x600/oorr-cuisine-club-one-1440x600.jpg?v1'];

  constructor() {
    console.log('labas');
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.less']
})
export class RepoDetailsComponent implements OnInit {

  code:string = '';

  constructor(
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.code = params['code'];
    });
  }

}

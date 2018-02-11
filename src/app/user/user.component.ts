import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	error: any;
	user: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
  	this.getUser();
  }
  
  getUser(){
  	const id = Number(this.route.snapshot.paramMap.get('id'));
  	let result: any;
  	this.dataService.getUsers()
		.subscribe(
			(data) => result = data,
			(err) => this.error = err,
			() => {
				for(let i=0; i<result.length; i++){
					if(id === result[i].id){
						this.user = result[i];
						break;
					}
				}
			}
		);
  }

}

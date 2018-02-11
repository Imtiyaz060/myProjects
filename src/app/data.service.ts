import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  constructor(private httpService: Http) { }
  
  getUsers() {
  	return this.httpService
		.get('https://jsonplaceholder.typicode.com/users')
		.map(this.extractData)
		.catch(this.handleError)
		;		
  }
  
  private extractData(res: Response){
  	const body = res.json();
	return body || {};
  }
  
  private handleError(res: Response | any){
  	let errMsg;
	
	if(errMsg instanceof Response){
		const body = res.json() || '';
		const err = body.error || JSON.stringify(body);
		errMsg = `${res.status} - ${res.statusText} ${err}`;
	}else {
		errMsg = res.message? res.message: res.toString();
	}
	
	return Observable.throw(errMsg);
  }
}

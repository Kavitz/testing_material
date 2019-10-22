import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { UtilService } from './utils.service';
import { APIConstants } from './constants';
import { environment } from '../../environments/environment';

@Injectable()
export class APIService {
	static _serverurl = 'http://149.204.148.220:3030/';


	constructor(private http: Http, private utilservice: UtilService) {
	}
	getShelfData() {
		this.getAPI(APIConstants.RETRIEVE_SHELFTYPES)
			.subscribe((shelfarray) => {
				this.utilservice.wdmshelftype = shelfarray;
			}, (err) => {
			});
		this.getAPI(APIConstants.RETRIEVE_SHELFTYPESOCS)
			.subscribe((shelfarray) => {
				this.utilservice.ocsshelftype = shelfarray;
			}, (err) => {
			});
	}
	getUserProfile(url: string, newValue: any) {
		return this.http.get( APIService._serverurl + url + newValue, this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	getAPI(url: string) {
		return this.http.get( APIService._serverurl + url +
			Math.floor(Math.random() * 1000001), this.utilservice.buildHeaders()
		).pipe(map(res => res.json()));
	}

	addAPI(url: string, newValue: any) {
		return this.http.post( APIService._serverurl + url, newValue, this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	postAPI(url: string, newValue: any) {
		return this.http.post( APIService._serverurl + url, newValue, this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	deletelogAPI(url: string, newValue: any) {
		return this.http.post( APIService._serverurl + url, newValue, this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	deleteAPI(url: string, newValue: any) {
		return this.http.delete( APIService._serverurl + url + newValue, this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	editAPI(url: string, name: string, updatedValue: any) {
		return this.http.put( APIService._serverurl + url + name,
			updatedValue, this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	checkExistingAPI(url: string, checkname: any) {
		return this.http.get( APIService._serverurl + url + checkname, this.utilservice.buildHeaders());
	}

	selectAPI(url: string, newValue: any) {
		return this.http.get( APIService._serverurl + url + newValue + '/' +
			Math.floor(Math.random() * 1000001), this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	select2API(url: string, val1: any, val2: any) {
		return this.http.get( APIService._serverurl + url + val1 + '/' + val2 + '/' +
			Math.floor(Math.random() * 1000001), this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	selectLogAPI(url: string, newValue: any) {
		return this.http.get( APIService._serverurl + url + Math.floor(Math.random() * 1000001) + '/' +
			newValue, this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	uploadSimlistFile(url: string, newValue: any) {
		return this.http.post ( APIService._serverurl + url, newValue)
			.pipe(map(res => res.json()));
	}

	deployAPI(url: string, newValue: any) {
		return this.http.post( APIService._serverurl + url + Math.floor(Math.random() * 1000001), newValue, this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}

	checkPassword(url: string, newValue: any, name: string) {
		return this.http.get( APIService._serverurl + APIService._serverurl + url + newValue + '/' + name, this.utilservice.buildHeaders());
	}
	updateFile(url: string, newValue: any) {
		return this.http.post( APIService._serverurl + url, newValue, this.utilservice.buildHeaders())
			.pipe(map(res => res.json()));
	}
	checkUsername(url: string, newValue: any) {
		return this.http.get( APIService._serverurl + url + newValue);
	}
}

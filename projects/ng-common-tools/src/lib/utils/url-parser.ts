import {Location} from '@angular/common';
import {memoize} from '../decorators/memoize';

export class UrlParser {

	static a:HTMLAnchorElement = null;

	static getAnchor(href:string = ''):HTMLAnchorElement {
		const location = this.a || (this.a = document.createElement('a'));
		location.href = /^\w+:\/\/.+/.test(href) ? href : `http://${href}`;
		if(location.host === '') location.href = location.href; // IE hack
		return location;
	}

	static hostname(url:string = '') {
		const a:HTMLAnchorElement = this.getAnchor(url);
		return a.hostname;
	}

	static search(url:string = '') {
		const a:HTMLAnchorElement = this.getAnchor(url);
		return a.search;
	}

	@memoize
	static decodedHostname(url:string = '') {
		const hostname:string = this.hostname(url);
		return decodeURIComponent(hostname);
	}

	static extractSearchParams(url:string = '') {
		let match;
		const decode = (s) => decodeURIComponent(s.replace(/\+/g, ' ')),
			search = this.search(url).substring(1);

		const searchParams = {};
		const searchParamsRegex = /([^&=]+)=?([^&]*)/g;
		while(match = searchParamsRegex.exec(search))
			searchParams[decode(match[1])] = decode(match[2]);

		return searchParams;
	}

	static implodeSearchParams(params:any = {}) {
		const names:string[] = Object.keys(params);
		const paramList:string[] = [];

		for(const name of names) {

			if(params[name] instanceof Array)
				for(const val of params[name])
					paramList.push(`${name}[]=${val}`);

			else paramList.push(`${name}=${params[name]}`);
		}

		return Location.normalizeQueryParams(paramList.join('&'));
	}

}

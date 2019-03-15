import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Inject} from '@angular/core';
import {catchError} from 'rxjs/operators';

export interface HttpOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;

    [prop: string]: any;
}

export abstract class HttpEndpoint {

    constructor(@Inject(HttpClient) protected http: HttpClient) {
    }

    abstract getEndpointHost();

    public get(url: string, options: HttpOptions = {}): Observable<any> {
        return this.http.get(this.prepareUrl(url), options).pipe(
            catchError((response) => this.parseErrorResponse(response))
        );
    }

    public post(url: string, body: any, options: HttpOptions = {}): Observable<any> {
        return this.http.post(this.prepareUrl(url), body, options).pipe(
            catchError((response) => this.parseErrorResponse(response))
        );
    }

    public put(url: string, body: any, options: HttpOptions = {}): Observable<any> {
        return this.http.put(this.prepareUrl(url), body, options).pipe(
            catchError((response) => this.parseErrorResponse(response))
        );
    }

    public delete(url: string, options: HttpOptions = {}): Observable<any> {
        return this.http.delete(this.prepareUrl(url), options).pipe(
            catchError((response) => this.parseErrorResponse(response))
        );
    }

    public patch(url: string, body: any, options: HttpOptions = {}): Observable<any> {
        return this.http.patch(this.prepareUrl(url), body, options).pipe(
            catchError((response) => this.parseErrorResponse(response))
        );
    }

    public head(url: string, options: HttpOptions = {}): Observable<any> {
        return this.http.head(this.prepareUrl(url), options).pipe(
            catchError((response) => this.parseErrorResponse(response))
        );
    }

    public request(request: HttpRequest<any>): Observable<any> {
        return this.http.request(request);
    }

    public prepareUrl(url: string) {
        return this.getEndpointHost() + url;
    }

    protected parseErrorResponse(response: HttpErrorResponse = {} as any) {
        return throwError(response.error);
    }

}

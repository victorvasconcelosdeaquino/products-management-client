import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from 'src/model/product';
import { User } from 'src/model/user';

const apiUrl = 'https://localhost:44378/api/product';
const apiLoginUrl = 'https://localhost:44378/api/authorization/login';
var token = '';
var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createTokenHeader(){
    token = localStorage.getItem("jwt");
    console.log('jwt header token ' + token);
    httpOptions = {headers: new HttpHeaders({"Authorization": "Bearer " + token, "Content-Type": "application/json"})}
  }

  login (User): Observable<User>{
    return this.http.post<User>(apiLoginUrl, User)
    .pipe(
      tap((User: User) => console.log(`Login user with email =  ${User.email}`)),
      catchError(this.handleError<User>('Login'))
    )
  }

  getProducts (): Observable<Product[]> {
    this.createTokenHeader();
    console.log(httpOptions.headers);
    return this.http.get<Product[]>(apiUrl, httpOptions)
      .pipe(
        tap(Categorias => console.log('read the products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Product>(url, httpOptions)
    .pipe(
      tap((Product: Product)  => console.log(`read the product id=${id}`)),
      catchError(this.handleError<Product>('getProduct'))
    )
  }

  addProduct(Product): Observable<Product>{
    this.createTokenHeader();
    return this.http.post<Product>(apiUrl, Product, httpOptions)
    .pipe(
      tap((Product: Product) => console.log(`added the Product id=${Product.id}`),
      catchError(this.handleError<Product>('addProduct')))
    )
  }

  updateProduct(id, Product): Observable<Product>{
    debugger
    const url = `${apiUrl}`;
    return this.http.put<Product>(Product, httpOptions)
    .pipe(
      tap((Product: Product) => console.log(`updated the Product id=${id}`),
      catchError(this.handleError<any>('addProduct')))
    )
  }

  deleteProduct(id): Observable<Product>{
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Product>(url, httpOptions)
    .pipe(
      tap(_ => console.log(`deleted the Product id=${id}`),
      catchError(this.handleError<any>('addProduct')))
    )
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of (result as T);
    };
  }
}

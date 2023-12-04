import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:9091/"
  updatecars = new EventEmitter<any>();
  progressBar = new EventEmitter<any>();

  
  

  constructor(private http: HttpClient) { }

  //signIn ans useer Auth

  signUp(data:any){
    var urlapi ='http://localhost:8081/api/signUp'
    return this.http.post(urlapi, data)
  }
  signIn(data:any){
    var urlapi = 'http://localhost:8081/api/signIn'
    return this.http.post(urlapi, data)
  }

  // Product Service
  getallProducts(){
    var urlapi = this.url + 'PRODUCT-SERVICE/api/getallcars'
    return this.http.get(urlapi)
  }

  addCar(carData:any){
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'multipart/form-data');
    var urlapi = 'http://localhost:8080/api/addCar'
    return this.http.post(urlapi, carData, { headers: httpHeaders })
  }

  updateCar(carData:any){
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'multipart/form-data');
    var urlapi = 'http://localhost:8080/api/Updatecar'
    return this.http.put(urlapi, carData, { headers: httpHeaders })
  }

  removeCar(id:any){
    const httpHeaders = new HttpHeaders();
    var urlapi = 'http://localhost:8080/api/deleteCar'
    return this.http.post(urlapi, id)
  }

  getCarById(id:any) {
    const httpHeaders = new HttpHeaders();
    var urlapi = `http://localhost:8080/api/getCar/${id}`
    return this.http.get(urlapi)
  }
  

  addOrder(data:any) {
    var url = "http://localhost:8085/api/addOrder"
    return this.http.post(url, data)
  }

  getallOrder(){
    let url = "http://localhost:8085/api/getAllOrders"
    return this.http.get(url)
    
  }

  updateOrder(data:any) {
    let url = "http://localhost:8085/api/updateOrder/"
    return this.http.put(url, data)
  }

  getOrderByUser(id:any){
    var urlapi = `http://localhost:8085/api/userOrders/${id}`
    return this.http.get(urlapi)
  }

  getcarsByIds(ids:any){
    let url = "http://localhost:8080/api/carsByIds"
    return this.http.post(url, {ids})
  }

  getCarOrders(id:any){
    let url = `http://localhost:8085/api/getCarOrders/${id}`
    return this.http.get(url)
  }

  cancelAppontment(cardata:any){
    let url = `http://localhost:8085/api/delete`
    return this.http.post(url, {cardata})
  }
}

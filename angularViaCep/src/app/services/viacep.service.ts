import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ViaCepResult } from '../models/ViaCepResult';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  apiUrl: string = environment.viacepUrl;

  constructor(private http: HttpClient) { }

  getEnderecoByCep(cep: string){
    return this.http.get<ViaCepResult>
    (this.apiUrl + cep + "/json/")
    .pipe(
      map((response)=>{
        return response;
      })
    )
  }
}

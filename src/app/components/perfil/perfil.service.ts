import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/service/base.service';
import { PerfilData } from './model/perfil-data';

@Injectable()
export class PerfilService extends BaseService {

  public constructor(
    private http: HttpClient
  ) {
    super();
  }

  public getPerfis(): Observable<PerfilData[]> {
    return this.http.get<PerfilData[]>(this.baseUrl + '/perfis', this.httpOptions);
  }

  public postPerfil(perfil: PerfilData): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/perfis', perfil, this.httpOptions);
  }

  public putPerfil(perfil: PerfilData): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/perfis', perfil, this.httpOptions);
  }

  public deletePerfil(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/perfis/' + id, this.httpOptions);
  }

}

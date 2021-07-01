import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/service/base.service';
import { UsuarioData } from './model/usuario-data';

@Injectable()
export class UsuarioService extends BaseService {

  public constructor(
    private http: HttpClient
  ) {
    super();
  }

  public getUsuarios(): Observable<UsuarioData[]> {
    return this.http.get<UsuarioData[]>(this.baseUrl + '/usuarios', this.httpOptions);
  }

  public postUsuario(usuario: UsuarioData): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/usuarios', usuario, this.httpOptions);
  }

  public putUsuario(usuario: UsuarioData): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/usuarios', usuario, this.httpOptions);
  }

  public deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/usuarios/' + id, this.httpOptions);
  }

}

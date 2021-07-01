import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/shared/base.service';
import { CargoData } from './model/cargo-data';

@Injectable()
export class CargoService extends BaseService {

  public constructor(
    private http: HttpClient
  ) {
    super();
  }

  public getCargos(): Observable<CargoData[]> {
    return this.http.get<CargoData[]>(this.baseUrl + '/cargos', this.httpOptions);
  }

  public postCargo(cargo: CargoData): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/cargos', cargo, this.httpOptions);
  }

  public putCargo(cargo: CargoData): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/cargos', cargo, this.httpOptions);
  }

  public deleteCargo(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/cargos/' + id, this.httpOptions);
  }

}

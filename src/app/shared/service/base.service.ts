import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseService {

  baseUrl: string = 'http://localhost:9000/api/v1';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  };

  extractData(res: Response) {
    return res.json();
  }
}

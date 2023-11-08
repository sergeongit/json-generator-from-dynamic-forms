import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  catchError,
  map,
  of,
} from 'rxjs'
import { DiagnosisInterface } from '../interfaces/diagnosis.interface'

@Injectable({
  providedIn: 'root',
})

export class DiagnosisCatalogService {
  API_URL = 'https://global.lakmus.org/Dictionaries/icpc2?IsPublic=true'

  constructor(
    private http: HttpClient,
  ) {}

  catalogStream = this.http.get<DiagnosisInterface[]>(this.API_URL)
                      .pipe(
                        map((items) => {
                          return items.map(item => ({
                            ...item,
                          }))
                        }),
                        catchError((err: any) => {
                          return of(err)
                        }),
                      )
}

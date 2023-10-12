import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  catchError,
  map,
  Observable,
  of,
  tap,
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

  getCatalog(): Observable<DiagnosisInterface[]> {
    return this.http.get<DiagnosisInterface[]>(this.API_URL)
               .pipe(
                 map((items) => {
                   return items.map(item => ({
                     id: item.id,
                     chapterNumber: item.chapterNumber,
                     chapterName: item.chapterName,
                     blockNumber: item.blockNumber,
                     blockName: item.blockName,
                     code: item.code,
                     name: item.name,
                     shortName: item.shortName,
                     isPublic: item.isPublic,
                   }))
                 }),
                 catchError((err: any) => {
                   return of(err)
                 }),
               )
  }

}

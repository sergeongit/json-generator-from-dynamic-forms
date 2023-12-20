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
  API_URL = 'https://cors-hijacker.vercel.app/api?url=https%3A%2F%2Fglobal.lakmus.org%2FDictionaries%2Ficpc2%3FIsPublic%3Dtrue'

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

import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class UuidGeneratorService {
  generateUUID() {
    return self.crypto.randomUUID()
  }
}

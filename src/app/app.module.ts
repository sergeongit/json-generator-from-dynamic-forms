import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { DiagnosisFormComponent } from './components/diagnosis-form/diagnosis-form.component'
import { HttpClientModule } from '@angular/common/http'
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { JsonViewComponent } from './components/json-view/json-view.component'

@NgModule({
  declarations: [
    AppComponent,
    DiagnosisFormComponent,
    JsonViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

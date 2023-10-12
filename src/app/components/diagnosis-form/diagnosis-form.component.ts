import {
  Component,
  OnInit,
} from '@angular/core'
import { DiagnosisCatalogService } from '../../services/diagnosis-catalog.service'
import { DiagnosisInterface } from '../../interfaces/diagnosis.interface'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { DiagnosisFormInterface } from '../../interfaces/from-diagnosis-form/diagnosis-form.interface'

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.scss'],
})

export class DiagnosisFormComponent implements OnInit {
  today = new Date()
  inputDate: string = ''
  onsetDate: string = ''
  dFormData: any

  diagnosisList: DiagnosisInterface[] | undefined
  selectedItem: DiagnosisInterface | undefined

  dForm = this.fb.group({
    meetDate: [
      '',
      [Validators.required,
        Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
      ],
    ],
    diagnosis: this.fb.array([
      this.createFormDiagnosis(),
    ]),
  })

  constructor(
    private diagnosisCatalog: DiagnosisCatalogService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.getDiagnosisList()
  }

  getDiagnosisList() {
    this.diagnosisCatalog.getCatalog().subscribe(list => this.diagnosisList = list)
  }

  createFormDiagnosis(): FormGroup {
    return this.fb.group({
      selectedDiagnosis: [''],
      diagnosisComment: [''],
    })
  }

  get formArray() {
    return this.dForm.get('diagnosis') as FormArray
  }

  addField() {
    this.formArray.push(this.createFormDiagnosis())
  }

  generateJSON() {
    this.dFormData = this.dForm.value
    this.onsetDate = new Date().toISOString()
  }
}

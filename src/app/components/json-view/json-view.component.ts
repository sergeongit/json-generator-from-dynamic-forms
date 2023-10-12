import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { OutputJsonInterface } from '../../interfaces/output/output-json.interface'
import { UuidGeneratorService } from '../../services/uuid-generator.service'
import { DiagnosisFormInterface } from '../../interfaces/from-diagnosis-form/diagnosis-form.interface'
import { ConditionInterface } from '../../interfaces/output/condition.interface'

@Component({
  selector: 'app-json-view',
  templateUrl: './json-view.component.html',
  styleUrls: ['./json-view.component.scss'],
})
export class JsonViewComponent implements OnChanges {
  @Input() formData!: DiagnosisFormInterface
  @Input() onsetDate!: string

  outputObject: OutputJsonInterface = {
    encounter: {
      date: '',
    },
    conditions: [],
  }

  constructor(
    private getUUID: UuidGeneratorService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateOutput()
  }

  updateOutput() {
    if (!this.formData) {
      return this.outputObject.conditions = []
    }

    if (!this.formData.diagnosis[0].selectedDiagnosis.id) {
      return this.outputObject.conditions = []
    }

    this.outputObject.conditions = []
    this.fillConditionsObj()
    return
  }

  fillConditionsObj() {
    let qtyOfDiagnosis = this.formData.diagnosis.length

    for (let i = 0; i < qtyOfDiagnosis; i++) {
      const conditionsObj: ConditionInterface = {
        id: this.getUUID.generateUUID(),
        context: {
          identifier: {
            type: {
              coding: [
                {
                  system: 'eHealth/resources',
                  code: 'encounter',
                },
              ],
            },
            value: this.formData?.diagnosis[i].selectedDiagnosis.id,
          },
        },
        code: {
          coding: [
            {
              system: 'eHealth/ICPC2/condition_codes',
              code: this.formData?.diagnosis[i].selectedDiagnosis.code,
            },
          ],
        },
        notes: this.formData?.diagnosis[i].diagnosisComment,
        onset_date: this.onsetDate,
      }
      this.outputObject.conditions?.push(conditionsObj)
    }

    this.outputObject.encounter.date = this.formData?.meetDate
  }
}

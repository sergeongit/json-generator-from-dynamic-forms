import { EncounterInterface } from './encounter.interface'
import { ConditionInterface } from './condition.interface'

export interface OutputJsonInterface {
  encounter: EncounterInterface
  conditions?: ConditionInterface[]
}

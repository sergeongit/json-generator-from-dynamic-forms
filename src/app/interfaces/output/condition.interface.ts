import { ContextInterface } from './context.interface'
import { CodeInterface } from './code.interface'

export interface ConditionInterface {
  id: string
  context: ContextInterface
  code: CodeInterface
  notes: string
  onset_date: string
}

import { Accessor } from "solid-js"

export type ActionButtonsData = {
  label: string,
  action: () => void
}

export type CounterData = {
  count: Accessor<number>,
  actionButtons: ActionButtonsData[]
}
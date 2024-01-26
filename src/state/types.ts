export interface Pair {
  from: string;
  to: string;
}

export interface Row {
  pairs: Pair[];
}

export interface Document {
  title: string;
  contents: Row[];
}

export interface Selection {
  rowId: number;
  pairId: number;
}

export interface State {
  document: Document;
  selectedPair: Selection | null;
}

export enum ActionType {
  ClearSelection,
  MoveLeft,
  MoveRight,
  NextPair,
  Return,
  SelectPair,
  UpdateCurrentPair,
}

export type Action =
  | { type: ActionType.ClearSelection }
  | { type: ActionType.MoveLeft }
  | { type: ActionType.MoveRight }
  | { type: ActionType.NextPair }
  | { type: ActionType.Return }
  | { type: ActionType.SelectPair; rowId: number; pairId: number }
  | { type: ActionType.UpdateCurrentPair; from: string; to: string };

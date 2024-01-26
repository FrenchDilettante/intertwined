import { State } from "./types";

export function assertSelection(state: State): asserts state is State & { selectedPair: Selection } {
  if (state === null) {
    throw new Error("Selection required");
  }
}

export function currentPair(state: State) {
  return state.selectedPair && state.document.contents[state.selectedPair.rowId]!.pairs[state.selectedPair.pairId]!;
}

export function isAtEnd(state: State) {
  return (
    state.selectedPair &&
    state.document.contents.length === state.selectedPair.rowId + 1 &&
    state.document.contents[state.selectedPair.rowId].pairs.length === state.selectedPair.pairId + 1
  );
}

export function isAtStart(state: State) {
  return state.selectedPair && state.selectedPair.rowId === 0 && state.selectedPair.pairId === 0;
}

import { produce } from "immer";
import { Action, ActionType, State } from "./types";
import { assertSelection, currentPair } from "./selectors";

export const reducer = produce((state: State, action: Action) => {
  switch (action.type) {
    case ActionType.ClearSelection:
      state.selectedPair = null;
      break;

    case ActionType.NextPair:
      state.selectedPair!.pairId++;
      if (currentPair(state) === undefined) {
        state.document.contents[state.selectedPair!.rowId].pairs.push({ from: "", to: "" });
      }
      break;

    case ActionType.MoveLeft:
      assertSelection(state);
      if (state.selectedPair.pairId > 0) {
        state.selectedPair.pairId--;
      } else if (state.selectedPair.rowId > 0) {
        state.selectedPair.rowId--;
        state.selectedPair.pairId = state.document.contents[state.selectedPair.rowId].pairs.length - 1;
        console.assert(state.selectedPair.pairId >= 0, "skipping row not supported");
      }
      break;

    case ActionType.MoveRight:
      assertSelection(state);
      if (state.selectedPair.pairId < state.document.contents[state.selectedPair.rowId].pairs.length - 1) {
        state.selectedPair.pairId++;
      } else if (state.selectedPair.rowId < state.document.contents.length - 1) {
        state.selectedPair.rowId++;
        state.selectedPair.pairId = 0;
      }
      break;

    case ActionType.Return:
      assertSelection(state);
      state.selectedPair.pairId = 0;
      state.selectedPair.rowId++;
      if (!state.document.contents[state.selectedPair.rowId]) {
        state.document.contents.push({
          pairs: [{ from: "", to: "" }],
        });
      }
      break;

    case ActionType.SelectPair:
      state.selectedPair = {
        rowId: action.rowId,
        pairId: action.pairId,
      };
      break;

    case ActionType.UpdateCurrentPair:
      assertSelection(state);
      const pair = currentPair(state)!;
      pair.from = action.from;
      pair.to = action.to;
      break;
  }
  return state;
});

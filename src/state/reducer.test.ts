import { ActionType, State } from "./types";
import { SAMPLE_DOCUMENT } from "../sample_document";
import { reducer } from "./reducer";
import { produce } from "immer";

const state: State = {
  editing: "from",
  document: SAMPLE_DOCUMENT,
  selectedPair: {
    rowId: 1,
    pairId: 0,
  },
};

describe("ClearSelection", () => {
  it("should clear the current pair selection", () => {
    const updated = reducer(state, { type: ActionType.ClearSelection });
    expect(updated).toEqual({
      ...state,
      selectedPair: null,
    });
  });
});

describe("Return", () => {
  it("should go to the next line", () => {
    const updated = reducer({ ...state, selectedPair: { rowId: 0, pairId: 0 } }, { type: ActionType.Return });
    expect(updated).toEqual({
      ...state,
      selectedPair: {
        rowId: 1,
        pairId: 0,
      },
    });
  });

  it("should create a new line", () => {
    const updated = reducer(state, { type: ActionType.Return });
    expect(updated).toEqual(
      produce(state, (state) => {
        state.selectedPair = { rowId: 2, pairId: 0 };
        state.document.contents.push({ pairs: [{ from: "", to: "" }] });
      }),
    );
  });
});

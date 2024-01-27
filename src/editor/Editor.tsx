import { FC, useReducer } from "react";
import { Context } from "./hooks";
import { PairEditor } from "./PairEditor";
import { getPairId } from "./utils";
import { ActionType, Document, reducer } from "../state";

export interface EditorProps {
  document: Document;
}

export const Editor: FC<EditorProps> = ({ document }) => {
  const ctx = useReducer(reducer, {
    document,
    editing: "from",
    selectedPair: null,
  });
  const [state, dispatch] = ctx;

  const selectPair = (rowId: number, pairId: number, editing: "from" | "to") => {
    dispatch({ type: ActionType.SelectPair, pairId, rowId });
    dispatch({ type: ActionType.SetEditing, editing });
  };

  return (
    <div>
      <Context.Provider value={ctx}>
        <h1 className="text-2xl mt-3 mb-5">{state.document.title}</h1>

        {state.document.contents.map((row, rowId) => (
          <div key={`row-${rowId}`} className="flex flex-wrap flex-row gap-2 mb-3">
            {row.pairs.map((pair, pairId) => {
              const selected = state.selectedPair?.rowId === rowId && state.selectedPair?.pairId === pairId;
              return (
                <div
                  id={getPairId(rowId, pairId)}
                  key={`pair-${pairId}`}
                  className={`text-center ${selected && "bg-neutral-50"} hover:bg-neutral-100 cursor-pointer`}
                >
                  <div className={"from"} style={{ marginBottom: 2 }} onClick={() => selectPair(rowId, pairId, "from")}>
                    {pair.from || "–"}
                  </div>
                  <div className={"to text-sm"} onClick={() => selectPair(rowId, pairId, "to")}>
                    {pair.to || "–"}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {state.selectedPair && <PairEditor />}
      </Context.Provider>
    </div>
  );
};

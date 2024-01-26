import { FC, KeyboardEventHandler, useEffect, useReducer, useRef, useState } from "react";
import { useEditor } from "./hooks";
import { InputField } from "./InputField";
import { getPairId } from "./utils";
import { ActionType, assertSelection, currentPair, isAtEnd, isAtStart } from "../state";

const BORDER_WIDTH = 2;
const PADDING_X = 8;
const PADDING_Y = 4;

export interface PairEditorProps {}

export const PairEditor: FC<PairEditorProps> = ({}) => {
  const [state, dispatch] = useEditor();
  const [editing, setEditing] = useState<"from" | "to">("from");
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEvent: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        dispatch({ type: ActionType.ClearSelection });
      }
    };
    document.addEventListener("mousedown", handleEvent);
    return () => document.removeEventListener("mousedown", handleEvent);
  });

  assertSelection(state);

  const pair = currentPair(state)!;
  const pairElement = document.getElementById(getPairId(state.selectedPair.rowId, state.selectedPair.pairId));

  const onKeyDown: KeyboardEventHandler = (event) => {
    const ctrlOrMeta = event.ctrlKey || event.metaKey;

    switch (event.code) {
      case "ArrowDown":
        event.preventDefault();
        setEditing("to");
        break;

      case "ArrowLeft":
        if (ctrlOrMeta) {
          event.preventDefault();
          dispatch({ type: ActionType.MoveLeft });
        }
        break;

      case "ArrowRight":
        if (ctrlOrMeta) {
          dispatch({ type: ActionType.MoveRight });
        }
        break;

      case "ArrowUp":
        event.preventDefault();
        setEditing("from");
        break;

      case "Enter":
        event.preventDefault();
        dispatch({ type: ActionType.Return });
        break;

      case "Escape":
        event.preventDefault();
        dispatch({ type: ActionType.ClearSelection });
        break;

      case "Space":
        if (!event.shiftKey) {
          event.preventDefault();
          dispatch({ type: ActionType.NextPair });
        }
        break;

      case "Tab":
        if (!event.shiftKey && !isAtEnd(state)) {
          event.preventDefault();
          dispatch({ type: ActionType.MoveRight });
        }
        if (event.shiftKey && !isAtStart(state)) {
          event.preventDefault();
          dispatch({ type: ActionType.MoveLeft });
        }
        break;
    }
  };

  const updateFrom = (value: string) => {
    dispatch({ type: ActionType.UpdateCurrentPair, from: value, to: pair.to });
  };
  const updateTo = (value: string) => {
    dispatch({ type: ActionType.UpdateCurrentPair, from: pair.from, to: value });
  };

  if (!pairElement) {
    setTimeout(() => forceUpdate(), 10);
    return <></>;
  }

  const left = pairElement.offsetLeft - PADDING_X - BORDER_WIDTH;
  const top = pairElement.offsetTop - PADDING_Y - BORDER_WIDTH;

  return (
    <div
      className={"absolute flex flex-col bg-neutral-100 border-neutral-500 text-center shadow"}
      ref={ref}
      style={{
        top,
        left,
        paddingTop: PADDING_Y,
        paddingLeft: PADDING_X,
        paddingBottom: 6,
        paddingRight: PADDING_X,
        borderWidth: BORDER_WIDTH,
      }}
    >
      <div>
        <div>
          <InputField
            value={pair.from}
            focus={editing === "from"}
            onChange={updateFrom}
            onClick={() => setEditing("from")}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className={"text-sm"}>
          <InputField
            value={pair.to}
            focus={editing === "to"}
            onChange={updateTo}
            onClick={() => setEditing("to")}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

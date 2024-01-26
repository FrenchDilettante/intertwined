import { createContext, Dispatch, useContext } from "react";
import { Action, State } from "../state";

export const Context = createContext<[State, Dispatch<Action>] | null>(null);

export function useEditor() {
  const ctx = useContext(Context);
  console.assert(ctx !== null, "missing context");
  return ctx!;
}

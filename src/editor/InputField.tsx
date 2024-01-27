import { FC, KeyboardEventHandler, MouseEventHandler, useEffect, useRef } from "react";

export interface InputFieldProps {
  onChange: (value: string) => void;
  onClick: MouseEventHandler;
  onKeyDown: KeyboardEventHandler;
  focus: boolean;
  value: string;
}

export const InputField: FC<InputFieldProps> = ({ focus, onChange, onClick, onKeyDown, value }) => {
  const ref = useRef<HTMLDivElement>(null);

  const selectAll = () => {
    const range = document.createRange();
    range.selectNodeContents(ref.current!);
    const selection = window.getSelection()!;
    selection.removeAllRanges();
    selection.addRange(range);
  };

  useEffect(() => {
    if (focus) {
      ref.current!.focus();
      selectAll();
    }
  }, [focus]);

  useEffect(() => {
    if (ref.current && value !== ref.current?.textContent) {
      ref.current.textContent = value;
      if (focus) {
        selectAll();
      }
    }
  }, [focus, value]);

  return (
    <div
      className={`border-b-2 ${focus && "border-neutral-600"}`}
      style={{ outline: "0px solid transparent" }}
      contentEditable={true}
      ref={ref}
      onClick={onClick}
      onKeyUp={(e) => onChange(e.currentTarget.textContent || "")}
      onKeyDown={onKeyDown}
      suppressContentEditableWarning={true}
    ></div>
  );
};

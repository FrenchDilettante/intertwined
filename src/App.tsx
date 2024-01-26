import React from "react";
import "./App.css";
import { Document } from "./state/types";
import { Editor } from "./editor";

const SAMPLE_DOCUMENT: Document = {
  title: "Hello, World!",
  contents: [
    {
      pairs: [
        {
          from: "Пролог.",
          to: "Prologue:",
        },
        {
          from: "Джулі",
          to: "Julie",
        },
      ],
    },
    {
      pairs: [
        {
          from: "Скопулі",
          to: "The Scopuli",
        },
      ],
    },
  ],
};

function App() {
  return (
    <div className="container mx-auto">
      <Editor document={SAMPLE_DOCUMENT} />
    </div>
  );
}

export default App;

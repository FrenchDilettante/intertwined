import React from "react";
import "./App.css";
import { Editor } from "./editor";
import { SAMPLE_DOCUMENT } from "./sample_document";

function App() {
  return (
    <div className="container mx-auto">
      <Editor document={SAMPLE_DOCUMENT} />
    </div>
  );
}

export default App;

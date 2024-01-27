import { Document } from "./state";

export const SAMPLE_DOCUMENT: Document = {
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

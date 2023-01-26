import { custom, history, builder } from "../assets";

export const navlinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Prompt Builder",
    link: "/prompt-builder",
    imgUrl: builder,
    description: "Construct prompts from series of choices",
  },
  {
    name: "Custom Prompt",
    link: "/custom-prompt",
    imgUrl: custom,
    description: "Enter you own custom prompt",
  },
  {
    name: "History",
    link: "/history",
    imgUrl: history,
    description: "Past prompts",
  },
];

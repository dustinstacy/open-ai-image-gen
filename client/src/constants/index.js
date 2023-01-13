import { buildingBlocks, neondice, wrench } from "../assets";

export const navlinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Prompt Builder",
    link: "/prompt-builder",
    imgUrl: buildingBlocks,
    description: "Construct prompts from series of choices",
  },
  {
    name: "Randomizer",
    link: "/randomizer",
    imgUrl: neondice,
    description: "Surprise me!",
  },
  {
    name: "Custom Prompt",
    link: "/custom-prompt",
    imgUrl: wrench,
    description: "Enter you own custom prompt",
  },
];

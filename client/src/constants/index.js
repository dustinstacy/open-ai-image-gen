import {
  backlight,
  blacklight,
  buildingBlocks,
  candlelight,
  neondice,
  studiolight,
  wrench,
  threeDRender,
  serene,
  bokeh,
  closeup,
  cybernetic,
  gloomy,
  gothic,
  longshot,
  ominous,
  overhead,
  postapocalyptic,
  spirited,
  vaporwave,
  dali,
  experimental,
  monumental,
  organic,
  giger,
  steadman,
  frazetta,
  etching,
  disney,
  elaborate,
  airbrush,
} from "../assets";

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

export const lighting = [
  {
    name: "Blacklight",
    imgUrl: blacklight,
    description: "Trippy",
  },
  {
    name: "Backlight",
    imgUrl: backlight,
    description: "Light source behind subject casting a glow",
  },
  {
    name: "Studio lighting",
    imgUrl: studiolight,
    description: "Professional style lighting",
  },
  {
    name: "Candlelight",
    imgUrl: candlelight,
    description: "Faint glimmer of warm light",
  },
];

export const energies = [
  {
    name: "spirited",
    imgUrl: spirited,
    description: "Full of energy, enthusiasm, and determination",
  },
  {
    name: "serene",
    imgUrl: serene,
    description: "Calm, peaceful, and untroubled",
  },
  {
    name: "gloomy",
    imgUrl: gloomy,
    description: "Distressed or pessimistic",
  },
  {
    name: "ominous",
    imgUrl: ominous,
    description: "Giving the impression that something bad is going to happen",
  },
];

export const aesthetics = [
  {
    name: "vaporwave",
    imgUrl: vaporwave,
    description: "Geometric and futuristic",
  },
  {
    name: "post-apocalyptic",
    imgUrl: postapocalyptic,
    description: "Desolate and bleak",
  },
  {
    name: "gothic",
    imgUrl: gothic,
    description: "Sharp architecture and dark tones",
  },
  {
    name: "cybernetic",
    imgUrl: cybernetic,
    description: "Futuristic biomechanical integration ",
  },
];

export const cameraSettings = [
  {
    name: "close-up",
    imgUrl: closeup,
    description: "Tight camera frame",
  },
  {
    name: "long shot",
    imgUrl: longshot,
    description: "Wide camera frame",
  },
  {
    name: "overhead",
    imgUrl: overhead,
    description: "View from above",
  },
  {
    name: "bokeh",
    imgUrl: bokeh,
    description: "Close up out-of-focus background",
  },
];

export const artists = [
  {
    name: "Ralph Steadman",
    imgUrl: steadman,
    description: "",
  },
  {
    name: "Salvador Dali",
    imgUrl: dali,
    description: "",
  },
  {
    name: "H.R. Giger",
    imgUrl: giger,
    description: "",
  },
  {
    name: "Frank Frazetta",
    imgUrl: frazetta,
    description: "",
  },
];

export const structure = [
  {
    name: "monumental",
    imgUrl: monumental,
    description: "Of great size",
  },
  {
    name: "organic",
    imgUrl: organic,
    description: "Derived from living matter",
  },
  {
    name: "elaborate",
    imgUrl: elaborate,
    description: "Many arranged parts or details",
  },
  {
    name: "experimental",
    imgUrl: experimental,
    description: "New and innovative",
  },
];

export const media = [
  {
    name: "etching",
    imgUrl: etching,
    description: "Finely carved text or design",
  },
  {
    name: "airbrush",
    imgUrl: airbrush,
    description: "Air propelled paint with fine condensed splatter like design",
  },
  {
    name: "3d render",
    imgUrl: threeDRender,
    description: "3d graphical representation of subject",
  },
  {
    name: "1990s Disney",
    imgUrl: disney,
    description: "Think Alladin, Lion King, Jungle Book",
  },
];

export const categories = ["Lighting", "Energies", "Aesthetics", "CameraSettings", "Artists", "Structure", "Media"];

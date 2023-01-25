import {
  backlight,
  blacklight,
  buildingBlocks,
  candlelight,
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
    name: "Custom Prompt",
    link: "/custom-prompt",
    imgUrl: wrench,
    description: "Enter you own custom prompt",
  },
  {
    name: "History",
    link: "/history",
    imgUrl: wrench,
    description: "Past prompts",
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
    name: "Spirited",
    imgUrl: spirited,
    description: "Full of energy, enthusiasm, and determination",
  },
  {
    name: "Serene",
    imgUrl: serene,
    description: "Calm, peaceful, and untroubled",
  },
  {
    name: "Gloomy",
    imgUrl: gloomy,
    description: "Distressed or pessimistic",
  },
  {
    name: "Ominous",
    imgUrl: ominous,
    description: "Giving the impression that something bad is going to happen",
  },
];

export const aesthetics = [
  {
    name: "Vaporwave",
    imgUrl: vaporwave,
    description: "Geometric and futuristic",
  },
  {
    name: "Post-apocalyptic",
    imgUrl: postapocalyptic,
    description: "Desolate and bleak",
  },
  {
    name: "Gothic",
    imgUrl: gothic,
    description: "Sharp architecture and dark tones",
  },
  {
    name: "Cybernetic",
    imgUrl: cybernetic,
    description: "Futuristic biomechanical integration ",
  },
];

export const camera = [
  {
    name: "Close-up",
    imgUrl: closeup,
    description: "Tight camera frame",
  },
  {
    name: "Long shot",
    imgUrl: longshot,
    description: "Wide camera frame",
  },
  {
    name: "Overhead",
    imgUrl: overhead,
    description: "View from above",
  },
  {
    name: "Bokeh",
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
    name: "Monumental",
    imgUrl: monumental,
    description: "Of great size",
  },
  {
    name: "Organic",
    imgUrl: organic,
    description: "Derived from living matter",
  },
  {
    name: "Elaborate",
    imgUrl: elaborate,
    description: "Many arranged parts or details",
  },
  {
    name: "Experimental",
    imgUrl: experimental,
    description: "New and innovative",
  },
];

export const media = [
  {
    name: "Etching",
    imgUrl: etching,
    description: "Finely carved text or design",
  },
  {
    name: "Airbrush",
    imgUrl: airbrush,
    description: "Air propelled paint with fine condensed splatter like design",
  },
  {
    name: "3d Render",
    imgUrl: threeDRender,
    description: "3d graphical representation of subject",
  },
  {
    name: "1990s Disney",
    imgUrl: disney,
    description: "Think Alladin, Lion King, Jungle Book",
  },
];

export const categories = ["Lighting", "Energies", "Aesthetics", "Camera", "Artists", "Structure", "Media"];

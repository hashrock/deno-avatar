/** @jsx h */
import {
  h,
  jsx,
  serve,
  serveStatic,
} from "https://deno.land/x/sift@0.5.0/mod.ts";
import { Avatar1 } from "./avatars/Avatar1.tsx";
import { Avatar2 } from "./avatars/Avatar2.tsx";
import { Avatar3 } from "./avatars/Avatar3.tsx";
import { Avatar4 } from "./avatars/Avatar4.tsx";
import { calcChecksum, Random } from "./util.ts";

interface IconProps {
  seed: string;
}

// taken from tailwind color pallete: 100
const bgColors = [
  "#fee2e2",
  "#ffedd5",
  "#fef3c7",
  "#fef9c3",
  "#ecfccb",
  "#dcfce7",
  "#d1fae5",
  "#ccfbf1",
];

// taken from tailwind color pallete: 200, 600, 900
const denoColors = [
  ["#fecaca", "#dc2626", "#7f1d1d"],
  ["#d9f99d", "#65a30d", "#365314"],
  ["#a7f3d0", "#059669", "#064e3b"],
  ["#bae6fd", "#0284c7", "#0c4a6e"],
  ["#ddd6fe", "#7c3aed", "#4c1d95"],
];
const components = [
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
];

const Icon = (props: IconProps) => {
  if (props.seed === undefined) {
    props.seed = "";
  }
  const checksum = calcChecksum(props.seed);
  const rand = new Random(checksum);
  const bgColor = bgColors[rand.nextInt(0, bgColors.length - 1)];
  const denoColor = denoColors[rand.nextInt(0, denoColors.length - 1)];
  const component = components[rand.nextInt(0, components.length - 1)];

  return (
    component(bgColor, denoColor)
  );
};

const NotFound = () => (
  <div>
    <h1>Page not found</h1>
  </div>
);
const now = new Date();
now.setDate(now.getDate() + 14);
const init = {
  headers: [["content-type", "image/svg+xml"], ["Expires", now.toUTCString()], [
    "Cache-Control",
    "public, max-age=604800",
  ]],
};

serve({
  "/": serveStatic("public/index.html", { baseUrl: import.meta.url }),
  "/avatar/:seed": (request, _connInfo, params) =>
    jsx(<Icon seed={"" + params?.seed} />, init),
  "/:filename+": serveStatic("public", { baseUrl: import.meta.url }),
  404: () => jsx(<NotFound />, { status: 404 }),
});

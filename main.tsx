/** @jsx h */
import {
  h,
  jsx,
  serve,
  serveStatic,
} from "https://deno.land/x/sift@0.4.2/mod.ts";
import { Avatar1 } from "./Avatar1.tsx";
import { Avatar2 } from "./Avatar2.tsx";

interface IconProps {
  color: string;
}

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

// 200, 600, 900
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
];

const Icon = (props: IconProps) => {
  const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
  const denoColor = denoColors[Math.floor(Math.random() * denoColors.length)];
  const component = components[Math.floor(Math.random() * components.length)];

  return (
    component(bgColor, denoColor)
    // Avatar2(bgColor, denoColor)
  );
};

const NotFound = () => (
  <div>
    <h1>Page not found</h1>
  </div>
);

const init = {
  headers: [["content-type", "image/svg+xml"]],
};

serve({
  "/": serveStatic("public/index.html", { baseUrl: import.meta.url }),
  "/avatar/:seed": (request, params) =>
    jsx(<Icon color={"#" + params?.seed} />, init),
  "/:filename+": serveStatic("public", { baseUrl: import.meta.url }),
  404: () => jsx(<NotFound />, { status: 404 }),
});

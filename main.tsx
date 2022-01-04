/** @jsx h */
import { h, jsx, serve } from "https://deno.land/x/sift@0.4.2/mod.ts";

const App = () => (
  <div>
    <h1>Deno Avatar</h1>

    <div>
      <img src="./FFAAAA" alt="" width="100" />
    </div>
  </div>
);

interface IconProps {
  color: string;
}

const Icon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 100 100"
  >
    <title>SVG Logo</title>
    <circle cx="50" cy="50" r="50" fill={props.color}>
    </circle>
  </svg>
);

const NotFound = () => (
  <div>
    <h1>Page not found</h1>
  </div>
);

const init = {
  headers: [["content-type", "image/svg+xml"]],
};

serve({
  "/": () => jsx(<App />),
  "/:seed": (request, params) => jsx(<Icon color={"#" + params?.seed} />, init),
  404: () => jsx(<NotFound />, { status: 404 }),
});

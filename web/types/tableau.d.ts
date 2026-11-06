import type { DetailedHTMLProps, HTMLAttributes } from "react";

type TableauVizProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  toolbar?: "top" | "bottom" | "hidden";
  device?: "default" | "desktop" | "tablet" | "phone";
  width?: string;
  height?: string;
  "hide-tabs"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tableau-viz": TableauVizProps;
    }
  }
}

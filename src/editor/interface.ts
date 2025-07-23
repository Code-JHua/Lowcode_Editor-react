import type { CSSProperties, PropsWithChildren } from "react";


export interface CommonComponentProps extends PropsWithChildren{
  id: number;
  name: string;
  style?: CSSProperties;
  [key: string]: any;
}
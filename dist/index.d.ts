import { ReactNode } from "react";
declare type Props = {
    children: ReactNode | Function;
    setting: object;
};
declare const MediaQuery: ({ children, ...setting }: Props) => any;
export default MediaQuery;
export declare const useMediaQuery: (media: {
    query: string;
}) => any;

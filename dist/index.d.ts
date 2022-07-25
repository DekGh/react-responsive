import { ReactNode } from "react";
declare type Props = {
    children: (data: boolean) => void | ReactNode;
};
declare const MediaQuery: ({ children, ...setting }: Props) => any;
export default MediaQuery;
export declare const useMediaQuery: (media: {
    query: string;
}) => boolean;

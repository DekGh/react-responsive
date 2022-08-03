import { ReactNode } from "react";
interface MediaProps {
    maxWidth?: number;
    minWidth?: number;
    minResolution?: `${number}ddpx` | number;
    maxResolution?: `${number}ddpx` | number;
    minHeight?: number;
    maxHeight?: number;
    orientation?: string;
}
declare type Props = {
    children: (data: boolean) => ReactNode | ReactNode;
} & MediaProps;
declare const MediaQuery: ({ children, ...setting }: Props) => any;
export default MediaQuery;
export declare const useMediaQuery: (media: {
    query: string;
}) => boolean;

import {useEffect, useState, ReactNode} from "react";

interface MediaProps {
    maxWidth?: number;
    minWidth?: number;
    minResolution?: `${number}ddpx` | number;
    maxResolution?: `${number}ddpx` | number;
    minHeight?: number;
    maxHeight?: number;
    orientation?: string;
}

type Props = {
    children: (data: boolean) => ReactNode | ReactNode;
} & MediaProps

const keySwitcher = {
    maxWidth: (maxWidth: number) => `(max-width: ${maxWidth}px)`,
    minWidth: (minWidth: number) => `(min-width: ${minWidth}px)`,
    minResolution: (minResolution: `${number}dppx` | number) => typeof minResolution === `number` ? `(min-resolution: ${minResolution}dppx)` : `(min-resolution: ${minResolution})`,
    maxResolution: (maxResolution: `${number}dppx` | number) => typeof maxResolution === `number` ? `(max-resolution: ${maxResolution}ddpx)` : `(max-resolution: ${maxResolution})`,
    minHeight: (minHeight: number) => `(min-height: ${minHeight}px)`,
    maxHeight: (maxHeight: number) => `(max-height: ${maxHeight}px)`,
    orientation: (orientation: string) => `(orientation: ${orientation})`
} as any

const MediaQuery = ({children, ...setting}: Props) => {

    const getQuery = Object.entries(setting).map(([key, value]) => { return  keySwitcher[key as keyof typeof keySwitcher](value) }).join(" and ")

    const matches = useMediaQuery({query: getQuery})

    return typeof children === 'function' ? children(matches) : matches ? children : null
}
export default MediaQuery


export const useMediaQuery = (media: {query: string}): boolean => {

    const [value, setValue] = useState(() => {
        const initialState = window.matchMedia(media.query).matches
        return initialState
    })

    useEffect(() => {
        const mql = window.matchMedia(media.query)

        const screenTest = (e: MediaQueryListEvent): void => { setValue(e.matches) }

        setValue(mql.matches)

        mql.addEventListener('change', screenTest)
        return () => { mql.removeEventListener('change', screenTest) }
    }, [media.query])

    return value
}
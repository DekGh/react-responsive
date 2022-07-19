import {useEffect, useState, ReactNode} from "react";

const keySwitcher = {
    maxWidth: (maxWidth: number) => `(max-width: ${maxWidth}px)`,
    minWidth: (minWidth: number) => `(min-width: ${minWidth}px)`,
    minResolution: (minResolution: string | number) => typeof minResolution === 'string' ? `(min-resolution: ${minResolution})` : `(min-resolution: ${minResolution}dppx)`,
    maxResolution: (maxResolution: number) => `(min-resolution: ${maxResolution})`,
    minHeight: (minHeight: number) => `(min-height: ${minHeight}px)`,
    maxHeight: (maxHeight: number) => `(max-height: ${maxHeight}px)`,
    orientation: (orientation: number) => `(orientation: ${orientation})`
};

type Props = {
    children: ReactNode | Function,
    setting: object
}

const MediaQuery = ({children, ...setting}: Props) => {

    const getKey = Object.keys(setting)[0]
    const getValue = Object.values(setting)[0]

    const isInfo = keySwitcher[getKey as keyof typeof keySwitcher](getValue);

    const matches = useMediaQuery({query: isInfo})

    return typeof children === 'function' ? children(matches) : matches ? children : null
}
export default MediaQuery


export const useMediaQuery = (media: {query: string}) => {

    let mql = window.matchMedia(media.query)

    const [value, setValue] = useState(mql.matches)

    const screenTest = (e: MediaQueryListEvent): void => {
        if (e.matches) {
            setValue(true)
        }
        else {
            setValue(false)
        }
    }

    useEffect(() => {
        mql.addEventListener('change', screenTest)
        return () => mql.removeEventListener('change', screenTest)
    }, [])

    return value
}
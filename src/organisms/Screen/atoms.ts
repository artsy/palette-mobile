import { atom, PrimitiveAtom, useAtom } from "jotai"
import { useEffect } from "react"
import { useScreenName } from "./hooks"

type PerScreen<T> = Record<string /* screen name */, T | undefined>

// screen stuff
const handledTopSafeAreaPerScreenAtom = atom<PerScreen<boolean>>({})
const bottomViewHeightPerScreenAtom = atom<PerScreen<number>>({})
const fullWidthBodyPerScreenAtom = atom<PerScreen<boolean>>({})

// animated header title stuff
const isAnimatedPerScreenAtom = atom<PerScreen<boolean>>({})
const titlePerScreenAtom = atom<PerScreen<string>>({})
const smallTitleShownPerScreenAtom = atom<PerScreen<boolean>>({})

// getter hook for all these atoms
const useGetterHook = <T>(atom: PrimitiveAtom<PerScreen<T>>, defaultValue: T): T => {
  const screenName = useScreenName()
  const [values] = useAtom(atom)

  return values[screenName] ?? defaultValue
}

// setter hook for all these atoms. it sets every time the value changed
const useSetterHook = <T>(atom: PrimitiveAtom<PerScreen<T>>, value: T): void => {
  const screenName = useScreenName()
  const [values, setValues] = useAtom(atom)

  useEffect(() => {
    if (value) {
      setValues({ ...values, [screenName]: value })
    }
  }, [value])
}

// hook that returns a setter function for these atoms
const useGetSetterHook = <T>(atom: PrimitiveAtom<PerScreen<T>>): ((v: T) => void) => {
  const screenName = useScreenName()
  const [values, setValues] = useAtom(atom)

  return (v: T) => setValues({ ...values, [screenName]: v })
}

export const useHandledTopSafeArea = (): boolean =>
  useGetterHook(handledTopSafeAreaPerScreenAtom, true)
export const useSetHandledTopSafeArea = (isHandled: boolean) =>
  useSetterHook(handledTopSafeAreaPerScreenAtom, isHandled)

export const useScreenBottomViewHeight = (): number =>
  useGetterHook(bottomViewHeightPerScreenAtom, 0)
export const useScreenBottomViewHeightSetter = () => useGetSetterHook(bottomViewHeightPerScreenAtom)

export const useScreenIsFullWidthBody = (): boolean =>
  useGetterHook(fullWidthBodyPerScreenAtom, false)
export const useSetScreenIsFullWidthBody = (isFullWidth: boolean) =>
  useSetterHook(fullWidthBodyPerScreenAtom, isFullWidth)

export const useAnimatedHeaderTitle = (): string => useGetterHook(titlePerScreenAtom, "")
export const useAnimatedHeaderSetTitle = (propTitle: string) =>
  useSetterHook(titlePerScreenAtom, propTitle)

export const useScreenTitleIsAnimated = (): boolean => useGetterHook(isAnimatedPerScreenAtom, false)
export const useSetScreenTitleIsAnimated = (isAnimated: boolean) =>
  useSetterHook(isAnimatedPerScreenAtom, isAnimated)

export const useAnimatedTitleSmallTitleShown = (): boolean =>
  useGetterHook(smallTitleShownPerScreenAtom, false)
export const useAnimatedTitleSmallTitleShownSetter = (): ((shown: boolean) => void) =>
  useGetSetterHook(smallTitleShownPerScreenAtom)

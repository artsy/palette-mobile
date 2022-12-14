import { isValidElement, Children, Fragment } from "react"

/**
 * Convert a fragment or nested fragment into an array of elements.
 */
export const flattenChildren = (children: React.ReactNode): React.ReactElement[] => {
  const xs = Children.toArray(children).filter(isValidElement)

  return xs.reduce((acc: React.ReactElement[], child: React.ReactElement) => {
    if (child.type === Fragment) {
      return [...acc, ...flattenChildren(child.props.children)]
    }

    return [...acc, child]
  }, [])
}

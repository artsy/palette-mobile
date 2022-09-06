import { Children, cloneElement } from "react"
import { flattenChildren } from "../../utils/flattenChildren"

interface JoinProps {
  children: React.ReactNode
  separator: React.ReactElement
  /** Flatten out nested fragments. Useful for Joins with conditional rendering */
  flatten?: boolean
}

/**
 * `Join` is a higher order component that renders a separator component
 * between each of `Join`'s direct children.
 *
 * @example
 *
 *  <Join separator={<SomeComponent/>}>
 *    <child1/>
 *    <child2/>
 *    <child3/>
 *  </Join>
 *
 * which renders
 *
 * <child1/>
 * <SomeComponent/>
 * <child2/>
 * <SomeComponent/>
 * <child3/>
 */
export const Join = ({ separator, children, flatten = false }: JoinProps) => {
  const childArray = flatten ? flattenChildren(children) : Children.toArray(children)

  return childArray.reduce((acc, curr, currentIndex) => {
    acc.push(
      cloneElement(curr as React.ReactElement<any>, {
        key: `join-${currentIndex}`,
      })
    )

    if (currentIndex !== childArray.length - 1) {
      acc.push(
        separator &&
          cloneElement(separator, {
            key: `join-sep-${currentIndex}`,
          })
      )
    }

    return acc
  }, [] as any)
}

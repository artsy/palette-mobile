import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { LayoutAnimation, View } from "react-native"
import { CheckCircleIcon, ChevronIcon } from "../../svgs"
import { Collapse } from "../Collapse"
import { Flex } from "../Flex"
import { Text } from "../Text"
import { Touchable } from "../Touchable"

interface CollapsableMenuItemProps {
  overtitle?: string
  title: string
  isExpanded?: boolean
  disabled?: boolean
  onExpand?: () => void
  onCollapse?: () => void
}

export interface CollapsibleMenuItem {
  isExpanded: () => boolean
  collapse: (onAnimationEnd?: () => void) => void
  expand: (onAnimationEnd?: () => void) => void
  completed: () => void
  offsetTop: () => Promise<number>
}

export const CollapsibleMenuItem = forwardRef<
  CollapsibleMenuItem,
  React.PropsWithChildren<CollapsableMenuItemProps>
>(
  (
    { children, overtitle, title, isExpanded = false, disabled = false, onExpand, onCollapse },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const componentRef = useRef<View>(null)

    useEffect(() => {
      setIsOpen(isExpanded)
    }, [])

    useImperativeHandle(
      ref,
      () => ({
        collapse(onAnimationEnd) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, onAnimationEnd)
          setIsOpen(false)
        },
        expand(onAnimationEnd) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut, onAnimationEnd)
          setIsOpen(true)
        },
        completed() {
          setIsCompleted(true)
        },
        isExpanded() {
          return isOpen
        },
        offsetTop: () => {
          return new Promise<number>((resolve) => {
            componentRef.current?.measureInWindow((_, h) => {
              resolve(h)
            })
          })
        },
      }),
      [isOpen]
    )

    return (
      <Flex ref={componentRef} collapsable={false}>
        <Touchable
          accessibilityRole="button"
          accessibilityLabel="Collapsible Element"
          accessibilityState={{ disabled }}
          accessibilityHint={"Tap to " + (isOpen ? "collapse" : "expand")}
          onPress={() => {
            setIsOpen(!isOpen)
            isOpen ? onCollapse?.() : onExpand?.()
          }}
          disabled={disabled}
        >
          {!!overtitle && (
            <Text variant="sm" color={disabled ? "mono30" : "mono100"}>
              {overtitle}
            </Text>
          )}
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            <Text variant="lg" color={disabled ? "mono30" : "mono100"} style={{ maxWidth: "90%" }}>
              {title}
            </Text>
            <Flex flexDirection="row" alignItems="center">
              {!!isCompleted && (
                <CheckCircleIcon
                  fill="green100"
                  height={24}
                  width={24}
                  style={{ marginRight: 5 }}
                />
              )}
              <ChevronIcon
                direction={isOpen ? "up" : "down"}
                fill={disabled ? "mono30" : "mono60"}
              />
            </Flex>
          </Flex>
        </Touchable>
        <Collapse opened={isOpen}>{children}</Collapse>
      </Flex>
    )
  }
)

import { Component } from "react"
import { View, ViewProps } from "react-native"
// @ts-ignore
import { animated, Spring } from "react-spring/renderprops-native"

const AnimatedView = animated(View)

export interface CollapseProps {
  /** Determines whether content is expanded or collapsed */
  opened: boolean
  /**
   * If we're rendering within a statically-sized component (e.g. FlatList), we need
   * to propagate a sentinel value in order to trigger re-render or re-measure.
   */
  onAnimationFrame?: (animateValue: { height: number }) => void
}

interface State {
  isMounted: boolean
  hasMeasured: boolean
  isMeasuring: boolean
  isAnimating: boolean
  measuredHeight?: number
}

/** Collapses content with animation when open is not true */
export class Collapse extends Component<CollapseProps, State> {
  measureRef: View | null = null

  state: State = {
    isMounted: false,
    isMeasuring: false,
    isAnimating: false,
    hasMeasured: false,
  }

  componentDidMount() {
    this.setState({ isMounted: true })
  }

  handleMeasureRef = (ref: View) => {
    this.measureRef = ref
  }

  measureChildren = () => {
    this.setState({ isMeasuring: true }, () => {
      requestAnimationFrame(() => {
        if (!this.measureRef) {
          this.setState({
            isMeasuring: false,
          })
          return
        }

        // @ts-ignore
        this.measureRef.measure((x, y, width, height) => {
          this.setState({
            isMeasuring: false,
            hasMeasured: true,
            measuredHeight: height,
          })
        })
      })
    })
  }

  handleLayout = (ev: any) => {
    const { opened } = this.props
    const { hasMeasured, isMeasuring, measuredHeight, isAnimating } = this.state
    const height = ev.nativeEvent.layout.height
    if (!hasMeasured || !opened || isMeasuring || measuredHeight === height || isAnimating) {
      return
    }
    this.setState({
      measuredHeight: height,
    })
  }

  handleFrame = (animatedValue: any) => {
    if (this.props.onAnimationFrame) {
      this.props.onAnimationFrame(animatedValue)
    }
  }

  componentWillReceiveProps(nextProps: CollapseProps) {
    const willExpand = nextProps.opened && !this.props.opened
    if (nextProps.opened !== this.props.opened) {
      this.setState({ isAnimating: true }, () => {
        if (willExpand && !this.measureRef && this.state.hasMeasured) {
          // We've previously measured children and can animate without further work.
          return
        } else if (!this.state.hasMeasured) {
          // Children are ready to measure, measureRef might be mounted already.
          this.measureChildren()
        }
      })
    }
  }

  measureView = () => (
    <View ref={this.handleMeasureRef} style={{ opacity: 0, position: "absolute" }}>
      {/* @ts-expect-error */}
      {this.props.children}
    </View>
  )

  render() {
    const { isMeasuring, isMounted, measuredHeight } = this.state
    // @ts-expect-error
    const { opened, children } = this.props

    // We must render children once in order to measure and derive a static height for animation.
    if (isMeasuring) {
      return this.measureView()
    }

    return (
      <Spring
        native
        immediate={!isMounted}
        from={{ height: 0 }}
        to={{ height: opened && measuredHeight ? measuredHeight : 0 }}
        onRest={() => {
          this.setState({ isAnimating: false })
        }}
        onFrame={this.handleFrame}
      >
        {(props: ViewProps) => (
          <AnimatedView style={{ ...props, overflow: "hidden" }} onLayout={this.handleLayout}>
            {children}
          </AnimatedView>
        )}
      </Spring>
    )
  }
}

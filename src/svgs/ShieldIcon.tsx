import { Icon, IconProps, Path } from "./Icon"
import { Color } from "../types"
import { useColor } from "../utils/hooks"

type ShieldIconProps = IconProps & {
  checkColor?: Color
  shieldColor?: Color
}

export const ShieldIcon = ({
  checkColor = "blue100",
  shieldColor = "black100",
  width = 22,
  height = 22,
  fill,
  ...restProps
}: ShieldIconProps) => {
  const color = useColor()

  return (
    <Icon {...restProps} viewBox="0 0 18 18" width={width} height={height}>
      <Path
        d="M 5.058594 13.128906 C 5.972656 13.992188 6.964844 14.769531 8.019531 15.457031 C 8.304688 15.648438 8.636719 15.75 8.980469 15.75 C 9.324219 15.75 9.660156 15.648438 9.941406 15.457031 C 10.9375 14.75 11.875 13.960938 12.738281 13.097656 C 13.824219 12.089844 14.628906 10.8125 15.070312 9.398438 C 15.089844 9.320312 15.09375 9.238281 15.078125 9.160156 C 15.066406 9.082031 15.035156 9.003906 14.996094 8.9375 C 14.953125 8.871094 14.894531 8.808594 14.832031 8.765625 C 14.765625 8.71875 14.691406 8.683594 14.613281 8.664062 C 14.457031 8.628906 14.292969 8.65625 14.152344 8.742188 C 14.015625 8.824219 13.917969 8.960938 13.878906 9.117188 C 13.488281 10.3125 12.796875 11.390625 11.871094 12.242188 C 11.058594 13.054688 10.175781 13.792969 9.234375 14.453125 C 9.15625 14.507812 9.058594 14.539062 8.960938 14.539062 C 8.867188 14.539062 8.769531 14.507812 8.691406 14.453125 C 7.695312 13.808594 6.761719 13.074219 5.902344 12.261719 C 4.917969 11.421875 4.179688 10.332031 3.769531 9.105469 C 3.636719 8.328125 3.589844 7.535156 3.636719 6.75 C 3.636719 6.210938 3.691406 5.710938 3.726562 5.339844 C 3.960938 5.339844 4.246094 5.386719 4.550781 5.398438 C 5.167969 5.4375 5.785156 5.382812 6.382812 5.234375 C 7.03125 5.015625 7.636719 4.691406 8.179688 4.269531 C 8.484375 4.042969 8.753906 3.824219 8.960938 3.660156 C 9.167969 3.835938 9.4375 4.0625 9.742188 4.269531 C 10.289062 4.695312 10.910156 5.023438 11.574219 5.234375 C 11.730469 5.277344 11.894531 5.257812 12.035156 5.175781 C 12.179688 5.097656 12.28125 4.964844 12.324219 4.808594 C 12.367188 4.652344 12.347656 4.484375 12.265625 4.34375 C 12.1875 4.203125 12.050781 4.097656 11.898438 4.054688 C 11.386719 3.882812 10.914062 3.621094 10.492188 3.285156 C 10.140625 3.027344 9.808594 2.75 9.492188 2.449219 C 9.355469 2.320312 9.175781 2.25 8.988281 2.25 C 8.800781 2.25 8.621094 2.320312 8.484375 2.449219 C 8.164062 2.746094 7.828125 3.027344 7.476562 3.285156 C 7.050781 3.621094 6.570312 3.882812 6.058594 4.0625 C 5.582031 4.175781 5.085938 4.214844 4.59375 4.179688 C 4.1875 4.164062 3.777344 4.128906 3.375 4.070312 C 3.277344 4.058594 3.179688 4.0625 3.085938 4.089844 C 2.992188 4.117188 2.902344 4.164062 2.828125 4.222656 C 2.75 4.285156 2.6875 4.359375 2.640625 4.445312 C 2.59375 4.53125 2.566406 4.625 2.554688 4.722656 C 2.523438 5.027344 2.445312 5.828125 2.421875 6.722656 C 2.367188 7.613281 2.421875 8.507812 2.585938 9.386719 C 3.050781 10.835938 3.90625 12.132812 5.058594 13.128906 Z M 5.058594 13.128906"
        fill={color(shieldColor)}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      <Path
        d="M 8.917969 6.667969 C 8.855469 6.617188 8.785156 6.574219 8.710938 6.550781 C 8.632812 6.523438 8.554688 6.511719 8.472656 6.515625 C 8.390625 6.523438 8.3125 6.542969 8.242188 6.578125 C 8.167969 6.613281 8.105469 6.664062 8.050781 6.722656 C 7.996094 6.785156 7.957031 6.855469 7.929688 6.933594 C 7.902344 7.007812 7.894531 7.089844 7.898438 7.167969 C 7.910156 7.332031 7.984375 7.484375 8.105469 7.589844 L 9.9375 9.222656 C 10.0625 9.363281 10.242188 9.449219 10.429688 9.460938 C 10.621094 9.472656 10.804688 9.414062 10.949219 9.289062 L 15.417969 5.09375 C 15.539062 4.984375 15.605469 4.828125 15.613281 4.667969 C 15.617188 4.507812 15.558594 4.347656 15.445312 4.230469 C 15.335938 4.113281 15.183594 4.042969 15.019531 4.039062 C 14.859375 4.03125 14.703125 4.09375 14.582031 4.203125 L 10.503906 8.050781 Z M 8.917969 6.667969"
        fill={color(checkColor)}
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </Icon>
  )
}

import { useColor } from "../hooks"
import { Icon, IconProps, Path } from "./Icon"

export const StarCircleIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 18 18" preserveAspectRatio="none">
      <Path
        d="M16.1114 8.19C16.1114 12.4371 12.6684 15.88 8.4214 15.88C4.17436 15.88 0.731445 12.4371 0.731445 8.19C0.731445 3.94293 4.17436 0.5 8.4214 0.5C12.6684 0.5 16.1114 3.94293 16.1114 8.19Z"
        fill={color(fill)}
        fillRule="nonzero"
      />
      <Path
        d="M16.1114 8.19C16.1114 12.4371 12.6684 15.88 8.4214 15.88C4.17436 15.88 0.731445 12.4371 0.731445 8.19C0.731445 3.94293 4.17436 0.5 8.4214 0.5C12.6684 0.5 16.1114 3.94293 16.1114 8.19Z"
        fill="white"
        fillRule="nonzero"
        scale={0.9}
        translateX={0.8}
        translateY={0.8}
      />
      <Path
        d="M8.39642 4C8.55418 4 8.6984 4.08913 8.76895 4.23023L9.84305 6.37846L12.2048 6.72199C12.3617 6.74481 12.492 6.85469 12.541 7.00545C12.59 7.15621 12.5491 7.32171 12.4356 7.43237L10.7167 9.10834L11.1034 11.4714C11.1289 11.6275 11.0638 11.7847 10.9352 11.877C10.8067 11.9693 10.6369 11.9807 10.4971 11.9065L8.39642 10.7919L6.2957 11.9065C6.15592 11.9807 5.98617 11.9693 5.85761 11.877C5.72906 11.7847 5.6639 11.6275 5.68946 11.4714L6.07613 9.10834L4.3572 7.43237C4.2437 7.32171 4.20286 7.15621 4.25184 7.00545C4.30082 6.85469 4.43114 6.74481 4.588 6.72199L6.94979 6.37846L8.0239 4.23023C8.09445 4.08913 8.23867 4 8.39642 4ZM8.39642 5.34782L7.59755 6.94557C7.5366 7.06748 7.41985 7.15185 7.28498 7.17147L5.54275 7.42488L6.81294 8.66333C6.91027 8.75823 6.95517 8.89465 6.93322 9.0288L6.64714 10.7771L8.2012 9.95246C8.32329 9.88768 8.46956 9.88768 8.59164 9.95246L10.1457 10.7771L9.85963 9.0288C9.83767 8.89465 9.88257 8.75823 9.9799 8.66333L11.2501 7.42488L9.50787 7.17147C9.37299 7.15185 9.25625 7.06748 9.19529 6.94557L8.39642 5.34782Z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

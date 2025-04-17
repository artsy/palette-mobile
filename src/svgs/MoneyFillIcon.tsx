import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../utils/hooks"

export const MoneyFillIcon = ({ fill = "mono100", ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 19 19">
      <Path
        d="M9.49441 18.5C14.4096 18.5 18.5 14.4182 18.5 9.5C18.5 4.58179 14.3984 0.5 9.48327 0.5C4.57925 0.5 0.5 4.58179 0.5 9.5C0.5 14.4182 4.59041 18.5 9.49441 18.5ZM9.48327 14.9424C9.20464 14.9424 8.99288 14.7305 8.99288 14.4405V13.7937C7.75571 13.6599 6.69691 12.9907 6.40711 11.8978C6.38483 11.7974 6.36253 11.7082 6.36253 11.5967C6.36253 11.2398 6.63003 10.9833 6.97554 10.9833C7.29876 10.9833 7.51052 11.1394 7.63311 11.4963C7.80031 12.0539 8.22383 12.4777 8.99288 12.6115V9.96841L8.9483 9.95724C7.37678 9.57807 6.54087 8.85317 6.54087 7.60409C6.54087 6.28811 7.55509 5.3959 8.99288 5.21747V4.57064C8.99288 4.28066 9.20464 4.07992 9.48327 4.07992C9.77305 4.07992 9.98483 4.28066 9.98483 4.57064V5.21747C11.1774 5.37361 12.1359 6.06505 12.4034 7.10222C12.4257 7.2026 12.448 7.30298 12.448 7.41449C12.448 7.77137 12.1805 8.02789 11.8238 8.02789C11.4895 8.02789 11.2889 7.83829 11.1885 7.51487C10.9768 6.91265 10.5755 6.55577 9.98483 6.43309V8.93124L10.0628 8.94238C11.7012 9.33272 12.5817 10.0242 12.5817 11.3401C12.5817 12.8234 11.4226 13.6599 9.98483 13.8048V14.4405C9.98483 14.7305 9.77305 14.9424 9.48327 14.9424ZM8.99288 8.67472V6.43309C8.25727 6.57806 7.85603 7.03532 7.85603 7.54833C7.85603 8.03903 8.15697 8.42937 8.91486 8.65243L8.99288 8.67472ZM9.98483 10.2249V12.6115C10.8876 12.4888 11.2666 12.0316 11.2666 11.4294C11.2666 10.8606 10.9768 10.5483 10.0628 10.2472L9.98483 10.2249Z"
        fill={color(fill)}
        fillRule="nonzero"
      />
    </Icon>
  )
}

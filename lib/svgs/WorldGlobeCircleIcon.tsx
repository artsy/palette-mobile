import { Icon, IconProps, Path } from "./Icon"
import { useColor } from "../hooks"

export const WorldGlobeCircleIcon = ({ fill, ...restProps }: IconProps) => {
  const color = useColor()
  return (
    <Icon {...restProps} viewBox="0 0 19 19">
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
        d="M14.679 10.7386L14.7015 10.6861C15.3645 9.10742 15.4669 7.34941 14.9918 5.70445C14.5166 4.0595 13.4925 2.62675 12.0899 1.64451L12.0223 1.59199C10.5724 0.602351 8.8213 0.152252 7.07374 0.320002C5.32618 0.487751 3.69275 1.26273 2.45762 2.51011C1.22249 3.7575 0.46384 5.39833 0.313655 7.14715C0.16347 8.89597 0.631256 10.6421 1.63563 12.0817V12.0967L1.67315 12.1417C2.25846 12.9633 3.00373 13.6582 3.86426 14.1846C4.72479 14.7111 5.68283 15.0584 6.6809 15.2055C7.67896 15.3527 8.69647 15.2967 9.67237 15.041C10.6483 14.7853 11.5624 14.3351 12.36 13.7175C12.3834 13.7075 12.404 13.6921 12.4201 13.6724C13.4077 12.8999 14.1847 11.8908 14.679 10.7386ZM7.78209 0.879169C9.13855 0.876105 10.4654 1.27565 11.5945 2.02719L11.6771 3.70044C11.6785 3.77728 11.6518 3.852 11.602 3.91054L9.93597 5.8314C9.88825 5.88676 9.82108 5.92167 9.74835 5.92895L7.39184 6.25159C7.31527 6.26203 7.23757 6.24328 7.1742 6.19907L5.69574 5.12608C5.59539 5.05561 5.4819 5.00602 5.362 4.98024C5.24211 4.95446 5.11825 4.95302 4.99779 4.97602C4.87781 4.99763 4.7637 5.04419 4.66286 5.1127C4.56202 5.18121 4.4767 5.27012 4.41242 5.3737L2.91896 7.70725C2.82695 7.85061 2.77751 8.01713 2.77636 8.18746L2.76135 10.8962C2.76203 10.9475 2.74922 10.998 2.72419 11.0428C2.69917 11.0876 2.66281 11.125 2.61876 11.1513L1.98836 11.534C1.26081 10.4181 0.87479 9.11427 0.877642 7.78228C0.879629 5.95207 1.6077 4.19739 2.9021 2.90324C4.19651 1.60908 5.95152 0.881156 7.78209 0.879169ZM2.34108 12.0217L2.92646 11.669C3.05848 11.5894 3.16783 11.4772 3.24404 11.3432C3.32026 11.2092 3.36079 11.0578 3.36174 10.9037L3.37675 8.18746C3.37909 8.13105 3.3973 8.07643 3.42928 8.02989L4.91524 5.69634C4.93688 5.66175 4.96534 5.63194 4.99889 5.60871C5.03244 5.58549 5.07037 5.56935 5.11037 5.56128C5.1918 5.54765 5.27534 5.56651 5.34302 5.6138L6.82147 6.68679C7.00866 6.81963 7.23952 6.876 7.46688 6.84436L9.83091 6.52922C10.0495 6.49789 10.2494 6.38863 10.3938 6.22158L12.0523 4.30071C12.1293 4.21581 12.1883 4.11619 12.2257 4.00786C12.2631 3.89953 12.2782 3.78474 12.27 3.67043L12.2174 2.4924C13.2934 3.39619 14.0687 4.60613 14.4401 5.96124C14.8114 7.31636 14.7613 8.7524 14.2963 10.0783L12.7503 8.66768C12.6239 8.55191 12.4673 8.47427 12.2987 8.44373C12.13 8.41319 11.9561 8.431 11.7972 8.4951L9.5157 9.44803C9.3719 9.50717 9.24586 9.60252 9.14986 9.7248C9.05385 9.84709 8.99115 9.99214 8.96785 10.1458L8.78773 11.3614C8.75446 11.5809 8.80348 11.805 8.92538 11.9906C9.04728 12.1761 9.23346 12.3102 9.44816 12.3669L11.0617 12.787C11.113 12.8026 11.1595 12.831 11.1968 12.8696L11.7521 13.4248C10.3046 14.4477 8.51818 14.8728 6.765 14.6114C5.01182 14.35 3.42712 13.4223 2.34108 12.0217ZM12.2325 13.0572L11.6246 12.4419C11.5111 12.3277 11.3682 12.2472 11.2118 12.2093L9.60576 11.7816C9.53424 11.7638 9.47177 11.7203 9.43025 11.6594C9.38873 11.5985 9.37106 11.5245 9.38062 11.4514L9.56073 10.2359C9.56754 10.1847 9.5878 10.1362 9.61943 10.0953C9.65107 10.0545 9.69296 10.0227 9.74085 10.0033L12.0298 9.05035C12.0825 9.02859 12.1404 9.02267 12.1964 9.03333C12.2524 9.044 12.304 9.07078 12.345 9.11038L14.0561 10.6711C13.627 11.5884 13.005 12.4022 12.2325 13.0572Z"
        fill={color(fill)}
        scale={0.6}
        translateX={3.5}
        translateY={3.5}
      />
    </Icon>
  )
}

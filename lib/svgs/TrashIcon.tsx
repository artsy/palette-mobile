// import { Icon, IconProps, Path } from "./Icon"
// import { useColor } from "../hooks"

// export const TrashIcon = ({ fill, ...restprops }: IconProps) => {
//   const color = useColor()
//   return (
//     <Icon {...restprops} viewBox="0 0 18 18">
//       <Path
//         d="M15 4h-3V2.465a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V4H3v1h1l1 10.54a.5.5 0 0 0 .5.46h7a.5.5 0 0 0 .5-.46L14 5h1V4zM7 2.965h4V4H7V2.965zm5 12.075H6L5.05 5H13l-1 10.04z"
//         fill={color(fill)}
//         fillRule="nonzero"
//       />
//     </Icon>
//   )
// }

export const TrashIcon = () => {
  return null
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 4.00001H12V2.46501C12 2.3324 11.9473 2.20523 11.8536 2.11146C11.7598 2.01769 11.6326 1.96501 11.5 1.96501H6.5C6.36739 1.96501 6.24022 2.01769 6.14645 2.11146C6.05268 2.20523 6 2.3324 6 2.46501V4.00001H3V5.00001H4L5 15.54C5.01008 15.6656 5.06717 15.7827 5.15987 15.868C5.25257 15.9533 5.37404 16.0004 5.5 16H12.5C12.626 16.0004 12.7474 15.9533 12.8401 15.868C12.9328 15.7827 12.9899 15.6656 13 15.54L14 5.00001H15V4.00001ZM7 2.96501H11V4.00001H7V2.96501ZM12 15.04H6L5.05 5.00001H13L12 15.04Z"
        fill="black"
      />
    </svg>
  )
}

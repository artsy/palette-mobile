import { MagnifyingGlassIcon } from "../../svgs"
import { useColor } from "../../utils/hooks"
import { Flex } from "../Flex"
import { Input, type InputProps } from "../Input"

export interface SearchInputProps extends InputProps {
  enableCancelButton?: boolean
}

export const SearchInput = ({
  enableCancelButton = true,
  onChangeText,
  onClear,
  ...props
}: SearchInputProps) => {
  const color = useColor()

  return (
    <Flex flexDirection="row" justifyContent="center">
      <Input
        icon={<MagnifyingGlassIcon width={18} height={18} fill="onBackgroundHigh" />}
        autoCorrect={false}
        enableClearButton={enableCancelButton}
        returnKeyType="search"
        onClear={() => {
          onClear?.()
        }}
        onChangeText={onChangeText}
        {...props}
        onFocus={(e) => {
          props.onFocus?.(e)
        }}
        style={{
          color: color("mono100"),
        }}
        onBlur={(e) => {
          props.onBlur?.(e)
        }}
      />
    </Flex>
  )
}

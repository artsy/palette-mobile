import { MagnifyingGlassIcon } from "../../svgs"
import { Flex } from "../Flex"
import { Input, InputProps } from "../Input"

export interface SearchInputProps extends InputProps {
  enableCancelButton?: boolean
}

export const SearchInput = ({
  enableCancelButton = true,
  onChangeText,
  onClear,
  ...props
}: SearchInputProps) => {
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
        onBlur={(e) => {
          props.onBlur?.(e)
        }}
      />
    </Flex>
  )
}

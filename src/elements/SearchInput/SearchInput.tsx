import { MagnifyingGlassIcon } from "../../svgs"
import { Flex } from "../Flex"
import { Input2, Input2Props } from "../Input2"

export interface SearchInputProps extends Input2Props {
  enableCancelButton?: boolean
  onCancelPress?: () => void
}

export const SearchInput = ({
  enableCancelButton = true,
  onChangeText,
  onClear,
  onCancelPress,
  ...props
}: SearchInputProps) => {
  return (
    <Flex flexDirection="row" justifyContent="center">
      <Input2
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

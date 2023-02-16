import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components/native"
import { Flex, FlexProps } from "../Flex"
import { Text, TextProps } from "../Text"

interface SimpleMessageProps extends FlexProps {
  children: React.ReactNode | null
  textVariant?: TextProps["variant"]
}

const StyledFlex = styled(Flex)`
  background-color: ${themeGet("colors.black5")};
  border-radius: 2px;
`

/**
 * A generic message window for displaying ZeroStates, notices, errors, etc.
 */
export const SimpleMessage: React.FC<SimpleMessageProps> = ({
  children,
  textVariant = "sm",
  ...restProps
}) => {
  return (
    <StyledFlex p={2} {...restProps}>
      <Text color="black60" variant={textVariant}>
        {children}
      </Text>
    </StyledFlex>
  )
}

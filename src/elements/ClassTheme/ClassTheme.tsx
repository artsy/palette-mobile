import { useTheme, Theme } from "../../"

export const ClassTheme = ({
  theme = "v3",
  children,
}: {
  theme?: "v3"
  children: React.ReactNode | ((helpers: ReturnType<typeof useTheme>) => React.ReactNode)
}) => {
  const currentTheme = useTheme()

  return (
    <Theme theme={theme}>
      {typeof children === "function" ? children(currentTheme) : children}
    </Theme>
  )
}

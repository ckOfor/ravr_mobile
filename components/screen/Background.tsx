import React from "react"
import { SpaceProps } from "styled-system"
import { ViewProps } from "react-native"
import { theme } from "../../theme"
import { Gradient } from "./styled"

const Background: React.FunctionComponent<ViewProps & SpaceProps> = ({
  children,
  ...props
}) => (
  <Gradient
    start={[0, 0.0221]}
    end={[0, 0.3]}
    colors={[theme.colors.primary, theme.colors.primary]}
    {...props}
  >
    {children}
  </Gradient>
)

export default Background

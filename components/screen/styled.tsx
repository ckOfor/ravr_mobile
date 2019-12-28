import styled from "styled-components/native"
import { StyledComponent } from "styled-components"
import { space, SpaceProps } from "styled-system"
import { LinearGradient } from "expo-linear-gradient"

const Gradient: StyledComponent<typeof LinearGradient, {}, SpaceProps> = styled(
  LinearGradient
)`
  flex: 1;
  ${space}
`

Gradient.defaultProps = {}

export { Gradient }

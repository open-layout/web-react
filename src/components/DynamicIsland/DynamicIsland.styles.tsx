import styled, { css } from "styled-components";
import { ColorsProps, StyledDynamicIslandProps } from '@/interfaces/DynamicIsland'

const colors: ColorsProps = {
  olayoutBlue: '#2f3448',
  olayoutPeach: '#ffd5bd',
  olayoutBlueLight: '#474f6e',
  olayoutBlueDark: '#3F4763',
}

export const StyledDynamicIsland = styled.div<StyledDynamicIslandProps>`
  align-items: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  border-radius: 99px;
  background-color: ${colors.olayoutPeach};
  color: ${colors.olayoutPeach};
  width: 96px;
  width: fit-content;
  padding: ${"36px 172px"};
  font-size: 0.75rem;
  display: grid;
  cursor: pointer;
  ${({ isOpen }) =>
    isOpen &&
    css`
      grid-template-rows: 75px 36px 40px;
    `}
`;

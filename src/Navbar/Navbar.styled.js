import styled from "styled-components";

export const Nav = styled.nav`
  background: ${({ theme }) => theme.bg2};
  padding: 20px 40px;
  position: relative;
`;
export const Center = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
  }
`;

export const Li = styled.li`
  margin-right: 20px;
  color: ${({ pathname, name, theme }) =>
    pathname === name ? theme.accent : theme.color};
  transition: 0.3s ease;
`;

export const Theme = styled.span`
  transition: 0.3s ease;
  cursor: pointer;
  color: ${({ open, theme }) => (open === "open" ? theme.accent : theme.color)};
`;

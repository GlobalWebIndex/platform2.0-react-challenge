import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  

  *,*::after, *::before{
    box-sizing:border-box;
    padding:0;
    margin:0;

  }

  body {
    font-family: "Roboto", sans-serif;
    background:${({ theme }) => theme.bg};
    
    color:${({ theme }) => theme.color};
  }

  ul{
    list-style-type:none;
    
  }

  a {
    text-decoration: none;
  }

  a,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
  }


`;

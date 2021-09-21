import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Input } from "semantic-ui-react";

const SearchBarContainer = styled.div`
  width: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export default function Searchbar({ data, setterCB, placeholder }) {
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    if (searchQuery) {
      const proccessedData = data.filter((item) =>
        item.name.includes(searchQuery.toLowerCase())
      );
      setterCB(proccessedData);
    } else {
      setterCB(data);
    }
  }, [data, searchQuery, setterCB]);

  return (
    <SearchBarContainer>
      <Input
        autoFocus
        icon="search"
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </SearchBarContainer>
  );
}

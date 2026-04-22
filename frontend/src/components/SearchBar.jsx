import React from 'react';
import { InputGroup, InputLeftElement, Input, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ value, onChange }) => (
  <Box flex="1" maxW="400px">
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="purple.400" />
      </InputLeftElement>
      <Input
        placeholder="Search users..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="whiteAlpha.100"
        border="none"
        _focus={{ bg: "whiteAlpha.200", boxShadow: "none" }}
      />
    </InputGroup>
  </Box>
);

export default SearchBar;

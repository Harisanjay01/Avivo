import React from 'react';
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

/**
 * SearchBar — reusable search input with clear button
 * @param {string}   value    - current search query
 * @param {Function} onChange - callback when query changes
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <Box flex="1" maxW="480px">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="brand.300" />
        </InputLeftElement>
        <Input
          id="user-search-input"
          placeholder="Search by name, company, role, country…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          bg="whiteAlpha.50"
          border="1px solid"
          borderColor="whiteAlpha.200"
          borderRadius="xl"
          _placeholder={{ color: 'whiteAlpha.400' }}
          _focus={{
            borderColor: 'brand.400',
            boxShadow: '0 0 0 2px rgba(128,25,255,0.35)',
            bg: 'whiteAlpha.100',
          }}
          _hover={{ borderColor: 'whiteAlpha.400' }}
          transition="all 0.2s"
        />
        {value && (
          <InputRightElement>
            <IconButton
              size="xs"
              icon={<CloseIcon />}
              aria-label="Clear search"
              variant="ghost"
              colorScheme="whiteAlpha"
              onClick={() => onChange('')}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};

export default SearchBar;

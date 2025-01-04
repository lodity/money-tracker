import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

interface SelectMenuProps {
  options: string[];
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
}

const SelectMenu: FC<SelectMenuProps> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <Menu>
      <MenuButton as={Button} width="100%" textAlign="left">
        {selectedOption || 'Select an option'}
      </MenuButton>
      <MenuList maxHeight="200px" overflowY="auto">
        <Box px="3" py="2">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={() => {
                setSelectedOption(option);
                setSearchTerm('');
              }}
            >
              {option}
            </MenuItem>
          ))
        ) : (
          <Box px="3" py="2">
            <Text>No results found</Text>
          </Box>
        )}
      </MenuList>
    </Menu>
  );
};

export default SelectMenu;

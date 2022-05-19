import React from 'react';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuProps as MenuPropsType } from '@material-ui/core/Menu';

import { FilterSelectionProps } from '../../types/componentTypes';
import { generateUniqueKey } from '../../helpers';

const menuProps: Partial<MenuPropsType> = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  getContentAnchorEl: null,
};

const Dropdown: React.FC<FilterSelectionProps> = ({
  options,
  active,
  filterLabel = '',
  handleChange,
}) => (
  <Box sx={{ minWidth: 100 }}>
    <FormControl fullWidth>
      <InputLabel id={`${filterLabel}_label`} color="secondary">
        {filterLabel}
      </InputLabel>
      <Select
        labelId={`${filterLabel}_label`}
        id={`${filterLabel}_select`}
        value={active}
        defaultValue=""
        label={filterLabel}
        onChange={handleChange}
        disabled={options.length === 0}
        color="secondary"
        MenuProps={menuProps}
      >
        {options.map(({ label, value }) => (
          <MenuItem value={value} key={generateUniqueKey(value)}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
);

export default Dropdown;

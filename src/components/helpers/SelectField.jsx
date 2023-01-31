import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectField = ({ handleChange, value, label, menuItems, name }) => {
  return (
    <FormControl sx={{ m: 2, minWidth: 320, width: 500 }}>
      <InputLabel id={`${name}-label`}> {label} </InputLabel>
      <Select
        labelId="selectLabel"
        id={name}
        key={name}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {menuItems.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;

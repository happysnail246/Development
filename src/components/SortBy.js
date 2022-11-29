import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function SortBy(props) {
  const [value, setValue] = React.useState("Popularity");

  const changeSort = (event) => {
    setValue(event.target.value);
    props.setCriteria(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="sort-by">
        Sort By:
      </FormLabel>
      <RadioGroup
        aria-labelledby="sort-by"
        defaultValue={"Popularity"}
        name="sortby"
        value={value}
        onChange={changeSort}
      >
        <FormControlLabel
          style={{ paddingLeft: "3.5px" }}
          value="Popularity"
          control={<Radio />}
          label="Popularity"
        />
        <FormControlLabel
          style={{ paddingLeft: "3.5px" }}
          value="Price"
          control={<Radio />}
          label="Price"
        />
        <FormControlLabel
          style={{ paddingLeft: "3.5px" }}
          value="Calories"
          control={<Radio />}
          label="Calories"
        />
      </RadioGroup>
    </FormControl>
  );


}

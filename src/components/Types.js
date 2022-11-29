import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import { useState } from "react";


export default function Types(props) {
  const [checkedLabels, setCheckedState] = useState(["All", "All", "All"]);

  const handleClick = (event) => {
    var newCheck = [...checkedLabels];
    console.log(event.target.checked);
    if (event.target.checked) {
      newCheck[parseInt(event.currentTarget.getAttribute("id"))] = event.target.value;
    } else {
      newCheck[parseInt(event.currentTarget.getAttribute("id"))] = "All";
    }
    console.log(newCheck);

    setCheckedState(newCheck);
    props.updateFilters(newCheck);
  };


return (
<FormGroup>
    <FormLabel id="types">
        Types:
    </FormLabel>
  <FormControlLabel control={<Checkbox/>} label="Bread" onClick={handleClick} value= "Bread" id="0" />
  <FormControlLabel control={<Checkbox />} label="Cake" onClick={handleClick} value= "Cake" id="1"/>
  <FormControlLabel control={<Checkbox />} label="Pastry" onClick={handleClick} value= "Pastry" id="2"/>
</FormGroup>
  );
}


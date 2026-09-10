import { useState } from "react";

export function CreateEmployee() {
  return (
    <div>
      <input type="text" />

      <p>Please select your age:</p>
      <input type="radio" id="age1" name="age" value="30" />
      <label htmlFor="age1">0 - 30</label>
      <br />
      <input type="radio" id="age2" name="age" value="60" />
      <label htmlFor="age2">31 - 60</label>
      <br />
      <input type="radio" id="age3" name="age" value="100" />
      <label htmlFor="age3">61 - 100</label>
      <br />
      <br />
      <input type="submit" value="Submit"></input>
    </div>
  );
}

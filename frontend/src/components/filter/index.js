<form>
<select onChange={(evt) => props.handleYearSelection(evt)}>
  <option value="">Year</option>
  <option value="2023">2023</option>
  <option value="2022">2022</option>
  <option value="2021">2021</option>
</select>
<select>
  <option value="">Month</option>
  <option value="01">Jan</option>
  <option value="02">Feb</option>
  <option value="03">Mar</option>
  <option value="04">Apr</option>
  <option value="05">May</option>
  <option value="06">Jun</option>
  <option value="07">Jul</option>
  <option value="08">Aug</option>
  <option value="09">Sep</option>
  <option value="10">Oct</option>
  <option value="11">Nov</option>
  <option value="12">Dec</option>
</select>
</form>

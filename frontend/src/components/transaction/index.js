import React from "react"
export const Transaction = (props) => {
  return (
    <li>
      {/* <input type="checkbox"
        onChange={handleToggle}
        checked={props.isComplete}
      /> */}
      {props.Description}
	  {props.Category}
	  {props.Amount}
    </li>
  )
}

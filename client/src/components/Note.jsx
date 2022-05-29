import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";


function Note(props) {
  function handleClick() {
    props.onDelete({
        id: props.id,
        title: props.title,
        content: props.content
      });
    }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;

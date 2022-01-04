import React from "react";
import axios from "axios";

const DeleteArticle = ({ id }) => {
  const handleDelete = () => {
    axios.delete("/articles/" + id);
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={() => {
          if (window.confirm("Voulez-vous supprimez cet article ?")) {
            handleDelete();
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteArticle;

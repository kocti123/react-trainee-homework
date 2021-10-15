function EditButton({ role, isEdit, onStartEdit, onSaveEdit, onCancelEdit }) {
  return (
    <>
      {role === "admin" ? (
        <>
          {isEdit ? (
            <>
              <button onClick={onSaveEdit}>Save</button>
              <button onClick={onCancelEdit}>Cancel</button>
            </>
          ) : (
            <button onClick={onStartEdit}>Edit</button>
          )}
        </>
      ) : undefined}
    </>
  );
}

export default EditButton;

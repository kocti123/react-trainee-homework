import { useState } from "react";

import EditProduct from "./EditProduct";

function ProductDescriptionEditable({
  role,
  product,
  setProduct,
  onUpdateInfo,
}) {
  const [isEdit, setIsEdit] = useState(false);

  function newProductInfoHandler(newInfo) {
    setProduct((prevState) => {
      const newState = {
        ...prevState,
        ...newInfo,
      };
      onUpdateInfo(newState);
      return newState;
    });
  }

  function editHandler() {
    setIsEdit(true);
  }

  function cancelEditHandler() {
    setIsEdit(false);
  }

  return (
    <>
      <img src={product.image} alt={product.title} />
      {isEdit ? undefined : (
        <>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.instock} is left</p>
          <p>{product.price}$</p>
        </>
      )}
      <EditProduct
        role={role}
        product={product}
        onNewProductInfo={newProductInfoHandler}
        onEdit={editHandler}
        onCancelEdit={cancelEditHandler}
        isEdit={isEdit}
      />
    </>
  );
}

export default ProductDescriptionEditable;

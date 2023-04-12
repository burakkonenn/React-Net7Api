import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct, deleteProduct } from "../features/productSlice";
import { Link } from "react-router-dom";

const Read = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.app;

  });


  useEffect(() => {
    dispatch(getAllProduct());
  }, []);



  return (
    <div className="mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Price</th>
            <th scope="col">Product Stock</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody>
          {data.products.map((item) =>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.productName}</td>
              <td>{item.productPrice}</td>
              <td>{item.unitStock}</td>
              <td>
                <button className="btn btn-warning" onClick={() => dispatch(deleteProduct(item.id))}>Delete</button>
                <Link to={`/edit/${item.id}`}>
                  <button className="btn btn-dark">Edit</button>
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../features/productSlice";

const Create = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user data...", data);
    dispatch(createProduct(data));
    navigate("/");
  };

  return (
    <div>
      <h2>Enter the data</h2>

      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header ">
              <h5>Add Product</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
             
                <div className="mb-3">
                  <input className="form-control" type="text" name="ProductName" placeholder="Enter Product Name" onChange={updateData} />
                </div>
                <div className="mb-3">
                  <input className="form-control" type="text" name="ProductPrice" placeholder="Enter Product Price" onChange={updateData} />
                </div>
                <div className="mb-3">
                  <input className="form-control" type="text" name="UnitStock" placeholder="Enter Unit Stock" onChange={updateData} />
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
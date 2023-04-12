import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct } from "../features/productSlice";

const Edit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const initialState = {
    ProductName: "",
    ProductPrice: "",
    UnitStock: "",
  };
  const [updatedData, setUpdatedData] = useState(initialState);

  //get all data
  const { products, loading } = useSelector((state) => state.app);
  
  useEffect(() => {
    //retrieving single data from user list
    if (id) {
      const singleData = products.find((product) => product.id == id);
      setUpdatedData({ ...singleData });

    }
  }, []);


  //updating state as use changes input field data
  const newData = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(updatedData));
    // setUpdatedData(initialState);
    navigate("/");
  };

  if (loading) {
    return <h2>Loading..</h2>;
  }

  return (
    <div className="row d-flex justify-content-center">
      <h2>Update the data</h2>
      <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="ProductName"
                    placeholder="enter ProductName"
                    value={updatedData.productName}
                    onChange={newData}
                  />
                </div>
                <div>
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="ProductPrice"
                    placeholder="enter ProductPrice"
                    value={updatedData.productPrice}
                    onChange={newData}
                  />
                </div>
                <div>
                  <input
                    className="form-control mb-3"
                    type="text"
                    name="UnitStock"
                    placeholder="enter UnitStock"
                    value={updatedData.unitStock}
                    onChange={newData}
                  />
                </div>
                <div>
                  <button className="btn btn-primary" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Edit;
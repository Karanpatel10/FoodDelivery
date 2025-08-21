import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({URL}) => {
 
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${URL}/api/food/list`);

    try{
      if(response.data.success){
          setList(response.data.data);
      }else{
        toast.error('Failed to load food list');
      }

    }catch(error){
      console.log(error);
      toast.error("server error while fetching food list");
    }
  };

  const removeItem = async (foodId) => {
    const response = await axios.post(`${URL}/api/food/remove`, { id: foodId });
    
    try{
      if (response.data.success) {
      await fetchList();
      toast.success(response.data.message);
    } else {
      toast.error("Failed to remove food item");
    }

    }catch(error){
      console.log(error);
      toast.error("server error while deleting");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="d-flex flex-column  container-fluid">
      <h4 className="mb-3">Food List</h4>
      <table>
        <thead>
          <tr className="border bg-light text-center">
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={index} className="border text-center">
                <td className="py-2">
                  <img
                    src={`${URL}/image/` + item.image}
                    alt={item.name}
                    style={{ width: "5rem", height: "4rem" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <i
                    className="bi bi-x-lg"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      removeItem(item._id);
                    }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;

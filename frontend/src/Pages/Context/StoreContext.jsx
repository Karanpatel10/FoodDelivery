import { createContext, useEffect, useState } from "react";
import { food_list as staticFoodList} from "../../assets/image/frontend_assets/assets";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItem,setCartItem]=useState({});
    const [food_list,setFoodList]=useState([]);
    const url =import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL   // local backend
    : import.meta.env.VITE_API_KEY;  // deployed backend

    const [token,setToken]=useState(localStorage.getItem("token")||null);


// To add Item in cart
    const addtoCart=async(itemId)=>{
            if(!cartItem[itemId])
            {
                setCartItem((prev)=>({...prev,[itemId]:1}))
            }else{
                setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            }
            if(token){
              await axios.post(url+"api/cart/add",{itemId},{headers:{token}})
            }
            
        }

  // remove item from cart
    const removetoCart=async(itemId)=>{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
            if(token)
            {
              await axios.post(url+"api/cart/remove",{itemId},{headers:{token}})
            }
        }

// to get total from cart
    const getTotalCartAmount=()=>{
      let totalAmount=0;
      for(const item  in cartItem)
      {
        if(cartItem[item]>0)
        {
            let iteminfo=food_list.find((product)=>product._id === item)
            totalAmount=totalAmount+(iteminfo.price*cartItem[item]);
        }
      }
      return totalAmount;
    }

// get list of combined from both server and local storage
    const fetchFoodList=async()=>{
        try{
              const response=await axios.get(url+'api/food/list');
              const backendList=response.data.data;
              const combinedList=[...staticFoodList,...backendList];
              setFoodList(combinedList);

        }catch(error){
            console.log('Error fetching food list from backend',error);
            setFoodList(staticFoodList);
        }
    }

// load data from backend display on frontend cart
    const loadCartData=async(token)=>{
      const response=await axios.post(url+"api/cart/get",{},{headers:{token}})
      setCartItem(response.data.cartData);
    }

    useEffect(()=>{      
      async function loaddata() {
        await fetchFoodList();
            if(localStorage.getItem("token"))
          {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
          }
      }
      loaddata();
    },[])

  const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addtoCart,
        removetoCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

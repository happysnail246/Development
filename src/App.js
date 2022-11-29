
import './App.css';
import SortBy from "./components/SortBy";
import Types from "./components/Types";
import DietaryRestrictions from "./components/DietaryRestrictions";
import bakeryData from "./assets/bakery-data.json";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import BakeryItem from "./components/BakeryItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */



function App() {
  const [cartItems, setCartItems] = useState([])
  const [price, setPrice] = useState(0.00)
  const [sortCriteria, setSortCriteria] = useState("Popularity");

   /* Filtering Logic => on change triggers updateFilters => populates list of filters => bakeryData is filtered based on filters*/
   const [typeFilters, setTypeFilters] = useState([]);
   const [dietFilters, setDietFilters] = useState([]);
   const [filterMethods, setFilterMethods] = useState([]);
 
   function updateTypeFilters(filters) {
     let filterFuncList = [];
     console.log(filters);
     for (let i = 0; i < filters.length; i++) {
      if (filters[i] === "All") {
        continue;
      }
       filterFuncList.push(matchesTypeFilter(filters[i]));
     }
     setTypeFilters(filterFuncList);
     console.log(filterFuncList);
     setFilterMethods([...dietFilters].concat(filterFuncList));
   }
 
   function matchesTypeFilter(field) {
     const filterFieldFunc = (item) => {
       // All Items Shown
      if (field.toLowerCase() === item.type.toLowerCase()) {
         return true;
       } else {
         return false;
       }
     };
     return filterFieldFunc;
   }
 
   function updateDietFilters(filters) {
     let filterFuncList = [];
     for (let i = 0; i < filters.length; i++) {
       if (filters[i] === "All") {
         continue;
       }
       filterFuncList.push(matchesDietFilter(filters[i]));
     }
     setDietFilters(filterFuncList);
     setFilterMethods([...typeFilters].concat(filterFuncList));
   }
 
   function matchesDietFilter(field) {
     const filterFieldFunc = (item) => {
       // All Items Shown
        return item.dietary.includes(field);
     };
     return filterFieldFunc;
   }

  function addToCart(item) {
    const finalCart = [];
    var seen = false;
    for (let i = 0; i < cartItems.length; i++) {
      finalCart[i] = cartItems[i];
      if (finalCart[i].name === item.name) {
        finalCart[i].count++;
        seen = true;
      }
    }
    if (!seen) {
      finalCart.push({ name: item.name, count: 1 });
    }

    setCartItems(finalCart);
    setPrice(price + item.price);
  }

  function removeFromCart(item) {
    const finalCart = [...cartItems];
    // Reverse Iterating to Prevent Deletion Issues
    for (let i = finalCart.length - 1; i >= 0; i--) {
      if (finalCart[i].name === item.name) {
        if (--finalCart[i].count === 0) {
          finalCart.splice(i, 1);
        }
        setPrice(price - item.price);
      }
    }
    setCartItems(finalCart);
  }

  function compareFunc(criteria) {
    if (criteria === "Popularity") {
      return function (a, b) {
        return b.popularity - a.popularity;
      };
    } else if (criteria === "Calories") {
      return function (a, b) {
        return a.calories - b.calories;
      };
    } else if (criteria === "Price") {
      return function (a, b) {
        return a.price - b.price;
      };
    }
  }

  function setCriteria(criteria) {
  setSortCriteria(criteria);
  }

  /* Sort Then Filter*/
  const sortedData = bakeryData.sort(compareFunc(sortCriteria));


   const filteredData = sortedData.filter((item) => {
     for (let i = 0; i < filterMethods.length; i++) {
       if (!filterMethods[i](item)) {
         return false;
       }
     }
     return true;
   });

  return (
    <div className="App">
      <header className="bakery">
        <h1 style={{marginLeft: "1rem"}}> 
          BBAAKKEERRYY
        </h1>
      </header>
      <div className='bakery'>
        <div className='leftside'>
          <div className='stuffonleft'>
          <div className='sortby'>
          <SortBy setCriteria={setCriteria}/>
      
          </div>
          <div className='types'>
          <Types
                updateFilters={updateTypeFilters}
               />
          </div>
          <div className='diet'>
          <DietaryRestrictions
          updateFilters={updateDietFilters}
          />
          </div>
          <p>
            CART: {cartItems.map((item, index) => (<p>x{item.count} {item.name}</p>))}
          </p>
          <p>
            PRICE: {Math.round(price * 100)/100}
          </p>
          </div>
        </div>
        <div classname = "rightside">
        <Grid container rowSpacing={1} columnSpacing={3}>
            {filteredData.map((item) => (
              <BakeryItem
                item={item}
                addToCart={addToCart}
                removeFromCart = {removeFromCart}
              />
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;


import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import axios from 'axios';

function App() {
  const [kanbanData, setData] = useState();
  const [actualData, setActualData] = useState();
  const [dropdownData, setDropdownData] = useState('status');

  const formatData = (actualData, keyName) => {

    var result = actualData?.users?.filter(function (itemm, o1) {
      // filter out (!) items in result2
      return actualData?.tickets?.some(function (o2) {
        return o1.id === o2.userId;          // assumes unique id
      });
    }).map(function (o) {
      // use reduce to make objects with only the required properties
      // and map to apply this to the filtered array as a whole
      return actualData?.tickets?.reduce(function (newo, item) {
        const { userId } = item;
        if (userId === o.id) {
          if (!newo[o.name]) {
            newo[o.name] = {
              items: [],
            };
          }
    
          newo[o.name].items.push(item);
        }
        return newo;
      }, {});
    });

    const groupedArrays = actualData?.tickets?.reduce((acc, item) => {
      let key;
      const { status, priority, title, userId } = item;
      if (keyName === 'status') {
        key = status;
      }
      if (keyName === 'priority') {
        key = priority;
      }
      if (keyName === 'title') {
        key = title;
      }

      // Check if the category array exists, if not create it
      if (!acc[key]) {
        acc[key] = {
          items: [],
        };
      }

      acc[key].items.push(item);
      return acc;
    }, {});
    if(keyName === 'user') {
      setData(...result);
    } else {
      setData(groupedArrays);
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
      // setActualData(response?.data);
      formatData(response?.data, 'status');
      setActualData(response?.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    formatData(actualData, dropdownData);
  }, [dropdownData])

  return (
    <div className=" overflow-hidden  overflow-x-scroll">
      <>
        <>
          <Header
            kanbanData={kanbanData}
            setDropdownData={setDropdownData}
          />
          <Home
            kanbanData={kanbanData}
          />
        </>

      </>
    </div>
  );
}

export default App;

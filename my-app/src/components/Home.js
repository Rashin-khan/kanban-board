import React from "react";

function Home({ kanbanData }) {

  return (
    <div className="listHeader">
      {kanbanData && Object.keys(kanbanData)?.map((keyName, i) => (
        <div className="cardContent mt-2" key={i}>
          {
  console.log(keyName)}
          <h4>{ keyName}</h4>
          {kanbanData[keyName]?.items?.map((item, i) => (
            <div class="card" key={i}>
              <div class="container">
                <span className="idtext"><b>{item.id}</b></span>
                <p>{item.title}</p>
                {item?.tag?.map((tagData, i) => (
                  <p key={i} className="chip">
                    <span class="dot"></span>{tagData}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}


    </div>
  );
}

export default Home;
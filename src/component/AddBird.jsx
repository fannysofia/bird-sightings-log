import React, { useState, useEffect } from "react";
//note the bootstrap in public/index.html
const AddBird = () => {
  const [birds, setBirds] = useState({});
  const [id, setId] = useState(0);
  //Must use useEffect not to forever loop fetch
  useEffect(() => {
    fetch("https://h2c-react-final-project-default-rtdb.firebaseio.com/birds.json")
      .then(function(response) {
        //response is plain encoded text
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }
        //convert text to json
        response.json().then(function(data) {
          setBirds(data);
          console.log(data);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error : ", err);
      });
  }, []);
  //Firebase data is key-value pairs not an array, here converting it first to array
  const birdArray = Array.from(Object.keys(birds), k => birds[k]);
  console.log(birdArray);
  const editBird = birdArray.map((bird, key) => {
    if (key === id) {
      return (
        <div>
          Bird
          <input value={bird.bird} />
          <br />
          Date
          <input value={bird.date} />
          <br />
          Place
          <input value={bird.place} />
          <br />
          Quantity
          <input value={bird.quantity} />
          <br />
        </div>
      );
    }
  });

  return (
    <div class="card">
      <h2>Birds sightings in 2020</h2>
      <div class="card-body">{editBird}</div>
      <button onClick={previous}>{"<"}</button>
      <button onClick={next}>{">"}</button>
    </div>
  );

  function next() {
    if (id < birdArray.length - 1) setId(id + 1);
  }

  function previous() {
    if (id > 0) setId(id - 1);
  }
};

export default AddBird;

import React, { useState, useEffect } from "react";
//note the bootstrap in public/index.html
//Example fetch data from Firebase
const BirdTable = () => {
  const [persons, setPersons] = useState({});
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
          setPersons(data);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error : ", err);
      });
  }, []);
  //Firebase data is key-value pairs not an array, here converting it first to array
  const personArray = Array.from(Object.keys(persons), k => persons[k]);
  console.log(personArray);
  console.log("number of sights:" +personArray.length);
  const listPersons = personArray.map((person, key) => {
    return (
      <div>
        <h5 class="card-title">
          Bird: {person.bird} - Date: {person.date} - Place: {person.place} - Quantity: {person.quantity}
        </h5>
      </div>
    );
  });

  return (
    <div class="card">
      <h2>Birds sightings in 2020</h2>
      <div class="card-body">Total number of sights: {personArray.length}</div>
      <div class="card-body">{listPersons}</div>
    </div>
  );
};

export default BirdTable;

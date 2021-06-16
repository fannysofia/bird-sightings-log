import React, { useState, useEffect } from "react";

//note the bootstrap in public/index.html
const NewBird = () => {
  const [birds, setBirds] = useState({});
  const [bird, setBird] = useState({});
  const [key, setKey] = useState();
  const [id, setId] = useState(0);
  const baseurl = "https://h2c-react-final-project-default-rtdb.firebaseio.com/birds.json";
  //Must use useEffect not to forever loop fetch
  useEffect(() => {
    fetch(baseurl)
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
        });
      })
      .catch(function(err) {
        console.log("Fetch Error : ", err);
      });
  }, []);
  //Firebase data is key-value pairs not an array, here converting it first to array
  const birdArray = Array.from(Object.keys(birds), k => birds[k]);
  console.log("number: " +birdArray.length);
  const editBird = birdArray.map((bird, key) => {
    if (key === id) {
      return (
        <div id="personDiv">
          Bird 
          <input
            id="bird"
            name="bird"
            type="text"
            value={bird.bird}
            onChange={e => update(e)}
          />
          <br />
          Date 
          <input
            id="date"
            name="date"
            type="date"
            value={bird.date}
            onChange={e => update(e)}
          />
          <br />
          Place 
          <input
            id="place"
            name="place"
            type="text"
            value={bird.place}
            onChange={e => update(e)}
          />
          <br />
          Quantity 
          <input
            id="quantity"
            name="quantity"
            type="number"
            value={bird.quantity}
            onChange={e => update(e)}
          />
          <br />
        </div>
      );
    }
  });

  return (
    <div class="card">
      <h2>Add new bird sigthing</h2>
      <div class="card-body">{editBird}</div>
      <button onClick={save}>Save to database</button>
      <p class="image">Refresh page (press F5) if you are adding several sightings after each other!</p>
         </div>
  );


  function update(e) {
    //find the key of the record to be saved
    let i = 0;
    let keynow = null;
    for (const key in birds) {
      if (i === id) {
        keynow = key;
      }
      i++;
    }
    //make a copy of the object in key-value list
    let bird = Object.assign({}, birds[keynow]);
    //update object value
    bird[e.target.name] = e.target.value;
    //copy the existing key-value list for editing
    console.log(bird);
    let newBirds = Object.assign({}, birds);
    //overwrite one person data
    newBirds[keynow] = bird;
    //write the latest to persons list
    setBirds(newBirds);
    //for saving (later) to Firebase save the key ans person data
    setKey(keynow);
    setBird(bird);
  }

  function save() {
    
    //find the url of the record to be saved
    const url = baseurl;
    //alert(url);
    //need to use PATCH in Firebase to overwrite (normally PUT)
    console.log(bird);
    fetch(url, {
      method: "PATCH",
      "Content-Type": "application/json",
      body: '{"sigth'+(birdArray.length+1)+'":'+JSON.stringify(bird)+'}'
      //TODO: Get the current array length without refreshing the page
    })
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
          console.log(data);
        });
      })
      .catch(function(err) {
        console.log("Fetch Error : ", err);
      });
  }

};

export default NewBird;

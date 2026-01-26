//-------------------------------------------------------------
//----------------------PROJECT BEGIN--------------------------
//---------------------------------------------------------------

//-----------------LINKS TO HTML AND AUDIO-----------------------

// link the html name container to javascript
const nameContainer = document.querySelector(".name-container");

//link the html cost container to javascript
const costContainer = document.querySelector(".cost-container");

// link bigring audio clip to javascript
const ringAudio = new Audio("audio/sonic-grabs-a-ring.mp3");

// link saleaudio clip to javascript
const saleAudio = new Audio(
  "https://soundbible.com/mp3/Cha_Ching_Register-Muska666-173262285.mp3",
);

// link resetaudio clip to javascript
const resetAudio = new Audio("audio/Voicy_Sonic ring loss.mp3");

// link landmark audio clip to javascript
const segaAudio = new Audio("audio/sega-hd.mp3");

// link the html BUY buttons to javasript
const button1 = document.getElementById("boostButton1");
const button2 = document.getElementById("boostButton2");
const button3 = document.getElementById("boostButton3");
const button4 = document.getElementById("boostButton4");
const button5 = document.getElementById("boostButton5");
const button6 = document.getElementById("boostButton6");
const button7 = document.getElementById("boostButton7");
const button8 = document.getElementById("boostButton8");
const button9 = document.getElementById("boostButton9");
const button10 = document.getElementById("boostButton10");

//-----------------------------------------------------------------

// step 1. CREATE A LARGE RING IMG ON THE HTML
// step 2. CREATE A P TAG ON THE HTML - for displaying the TOTAL RINGS COLLECTED SO FAR (THE BANK). As this text display will be a variable (changing all the time) we must also give it an id name to be able to manipulate visual changes.
// step 3. CREATE A P TAG ON THE HTML - for displaying the current RINGS PER SECOND (toppng up the bank). As this text display will be a variable (changing all the time) we must also give it an id name to be able to manipulate visual changes.
// step 4 & 5 - We will also create 2 more p tags just above steps 2 and 3 to inform users what the changing values represent.

// link the 2 variable p tag elements to javascript
const myRingCountDisplay = document.getElementById("ringCount");
const myRpsDisplay = document.getElementById("rps");

// link the large html ring image to javascript
const myImage = document.querySelector("img");

//-------------------------------------------------------------------
//-----------------------LOCAL STORAGE SETUP-------------------------
//-------------------------STARTING VALUES---------------------------

// now tell your myRingCountDisplay to display whatever it's value is as a text value. Which is then pasted in between the <p> tags on the document (with the id of ringCount). This won't display anything just yet as we need to set what value the ringCount starts at. Which will of course be zero. We are going to be saving the variable ring counts in local storage, so lets tell the default start values where to retrieve this data.

// if localstage.getItme is null, (as it is on inital page load) it wont display a text value, so we add || 0. Which means OR make value display 0.
let ringCount = Number(localStorage.getItem("localRingCount")) || 0;
console.log(ringCount);
myRingCountDisplay.innerText = ringCount;

// if localstage.getItme is null, (as it is on inital page load) it wont display a text value, so we add || 1. Which means OR make value display 0.
let rps = Number(localStorage.getItem("localRpsCount")) || 1;
console.log(rps);
myRpsDisplay.innerText = rps;

//------------------------------------------------------------------
//--------------------------RESET BUTTON---------------------------

// link the reset button
const resetButton = document.getElementById("reset");

// add event listener to reset button and halt the previous boosts
resetButton.addEventListener("click", function (reset) {
  const resetPressed = true;
});

// add event listener to reset button and halt the previous boosts
resetButton.addEventListener("click", function () {
  let ringCount = 0; // reset ringCount to 0
  console.log(ringCount);
  localStorage.setItem("localRingCount", ringCount); // stores the updated ringCount in the local storage
  myRingCountDisplay.innerText = ringCount; // refreshes variable text
  let rps = 1; // reset rps to 1
  console.log(rps);
  localStorage.setItem("localRpsCount", rps); // stores the updated rps in the local storage
  myRpsDisplay.innerText = rps; // refreshes variable text
  resetAudio.play();
});

//-----------------------------------------------------------------
//------------------ADD EVENT LISTENER TO BIG RING-----------------
//-------------------ADD PLUS ONE TO THE RINGCOUNT-------------------
//-----------------------UPDATE INNER TEXT---------------------------
//--------------------ADD AUDIO TO EACH CLICK-----------------------
//---------------------SAVE TO LOCAL STORAGE-----------------------

// now let's make the large spinning ring recognise when it has been clicked. Add an event listener to it. Then a function to add 1 to the ringCount value every time it's clicked. If you check your console at this stage you will see the console is detecting each click. But it's not pasting it's updated value to the page. This is because the code runs down this page, and it needs reminding to change the innerText value again. So add this line, and see what happens
myImage.addEventListener("click", function () {
  //detects a click
  ringCount++; // add one to the ringCount
  localStorage.setItem("localRingCount", ringCount); // stores the updated ringCount in the local storage
  myRingCountDisplay.innerText = ringCount; // refreshes variable text
  ringAudio.play(); // plays a sound on each click
});

//----------------------------------------------------------------
//--------------------SET UP INTERVAL TIMER-----------------------
//-------------ADD PLUS ONE TO RINGCOUNT EVERY SECOND------------
//-----------------UPDATE INNER TEXT DISPLAY-----------------------
//--------------------SAVE TO LOCAL STOAGE-------------------

// we also want to automatically top up the bank even when nobody is clicking the big ring. So let's set up an interval timer. This will add an extra ring to the bank every second. It will also remind the innerText to update each time. Remember, by not adding this reminder - the total in the bank will only update when the big ring is clicked (as we put a reminder in that function too).

setInterval(function () {
  ringCount++; // add plus one to ringCount value
  localStorage.setItem("localRingCount", ringCount);
  myRingCountDisplay.innerText = ringCount; // update the innertext value
}, 1000); // store the constantly updating ringCount value in local storage

//----------------------SETUP UPGRADE SHOP-------------------------
//-----------------------RETRIEVE API DATA-------------------------
//-----------TRANSLATE JSON FORMAT INTO JAVASCRIPT FORMAT----------

// the last main task is the shop. Here we will allow users to spend the coins they have ammassed in the bank to buy RPS speed upgrades (speeding up the RPS - thus increasing the amount of rings automatically aquired per second. We must as part of this assignment, receive this data from a given API. An API acts like a waiter in a restaurant. You tell the waiter (the API) what you want from the kitchen (the server) and they bring it back to you. However, pulling info from an API is received in a slightly different format from js. It comes as in .json format. These are the steps to retrieve an API and how to translate it into readable javascript format.

// the API we need to grab the upgrade details from is located at https://cookie-upgrade-api.vercel.app/api/upgrades

// synchornous -> happening at the same time
// asynchornous -> not happening at the same time

// Async functions, means the data received may not be in sync with the rest of the data available to js at the time. Because of the time delays in fetching the data (for example, the server may be located in USA).

// Whenever we fetch data it must happen inside an async function. This basically tells js to go ahead and run all the other functions, and come back to fetch this async data when it can.

// so we start by creating an async function, and we use an inbuilt JS function called fetch()
// fetch - fetches! - we can use it to make an API request to a external website using our own js calling code.
// note, by requesting "fetch()"" on its own, if you console log the outcome, you will see it only ever fetches a "promise" of more data. Almost like a waiter saying "I'll get that to you when I can, the chef is very busy". This is no good, we can't move on until we are fed this required data, so we must be adamant to the waiter we dont want it to skip over this line until we have it. We do this by adding "await fetch" instead.

//so let's give this async function a name, I will call it fetchApi

async function fetchApi() {
  // and ask the function to save the API data we receive as a given name. i will call it ApiResponse. Remember this value will come to use in json format.
  const apiResponse = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades",
  );
  console.log(apiResponse); // this fetched repsonse comes back to us in .json format. now we tell our program how to read that data properly. I will save the translated data as readableData.

  // again, if we also dont add await, it will just return a promise (on the console log).
  const readableData = await apiResponse.json();
  console.log(readableData);
  return readableData; // add a return so we can supply this translated data to other functions outside of this fetchApi function. If we don't, then this value is reserved to only being readable within this function.

  // that's it. you will see on the console log now the json data first, followed by the js (readable) data.

  //to recap, in the function code
  // fetch gets the data
  // .json() tells the function how to read/translate the data

  // and now we have all the API data (an array of objects) saved within the given name readableData. We need to now pull each object detail from that array by using a loop function.
}
//----------------------------------------------------------------
//-------------PULL NAME DATA FROM THE READABLE DATA----------------

//now we need to create a loop function to pull all the NAME properties from the API's array of objects.

async function pullName() {
  const readableData = await fetchApi(); // returned readableData
  for (let i = 0; i < readableData.length; i++) {
    // loop
    const madeNameElement = document.createElement("div"); // <div>
    madeNameElement.innerText = readableData[i].name; //pulls the name values
    madeNameElement.addEventListener("click", function () {
      console.log(readableData[i].name); //check it pulled the right index value from the array
    });

    nameContainer.append(madeNameElement); // add the created <div> element to the name containers
  }
}

pullName(); // invoker command

//---------------------------------------------------------------
//-------------PULL COST DATA FROM THE READABLE DATA----------------

//now we need to create a loop function to pull all the COST properties from the API's array of objects.

async function pullCost() {
  const readableData = await fetchApi(); // returned readableData
  for (let i = 0; i < readableData.length; i++) {
    //loop
    const madeCostElement = document.createElement("div"); // <div>
    madeCostElement.innerText = `(-) ${readableData[i].cost} rings`; // pulls the cost values
    madeCostElement.addEventListener("click", function () {
      console.log(readableData[i].cost); // check it pulled the right index value from the array
    });

    costContainer.append(madeCostElement); // add the created <div> element to the cost containers
  }
}

pullCost(); // invoker command

//----------------------------------------------------------------
//-----------PULL INCREASE DATA FROM THE READABLE DATA------------

//now we need to create a loop function to pull all the INCREASE properties from the API array objects.

async function pullIncrease() {
  const readableData = await fetchApi(); // returned readableData
  for (let i = 0; i < readableData.length; i++) {
    //loop
    const madeIncreaseElement = document.createElement("div"); //<div>
    madeIncreaseElement.innerText = `(+) ${readableData[i].increase} rps`; // pulls the increase values
    madeIncreaseElement.addEventListener("click", function () {
      console.log(readableData[i].increase); // check it pulled the right index value from the array
    });

    increaseContainer.append(madeIncreaseElement); // add the created <div> element to the increase containers
  }
}

pullIncrease(); // invoker command

//-----------------------------------------------------------
//-----------ADD EVENT LISTENER TO BUY BUTTONS---------------

// add an event listener to each button for when a user clicks on it
button1.addEventListener("click", () => {
  if (ringCount >= 100) {
    rps++; // add plus onto to the RPS total
    localStorage.setItem("localRpsCount", rps); // store the updated rps value in the local storage
    myRpsDisplay.innerText = rps; // update the rps text display
    saleAudio.play(); // play a purchase sound
    ringCount -= 100; // debit 100 coins from ringCount total
    setInterval(function () {
      // create an interval timer to add an extra plus one to the ringCount value every 1 second
      ringCount += 1; // add plus one to the ringCount
      myRingCountDisplay.innerText = ringCount;
      localStorage.setItem("localRingCount", ringCount); // store the new (debited) ringCount value in local storage
    }, 1000); // every 1 second
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!", // trigger an alert pop up if the user hasn't ammased enough coins to afford the booster.
    );
  }
});

button2.addEventListener("click", () => {
  if (ringCount >= 500) {
    rps += 5;
    myRpsDisplay.innerText = rps;
    localStorage.setItem("localRpsCount", rps);
    saleAudio.play();
    ringCount -= 500;
    const boost2 = setInterval(function () {
      ringCount += 5;
      myRingCountDisplay.innerText = ringCount;
    }, 1000);
    localStorage.setItem("localRingCount", ringCount);
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!",
    );
  }
});

button3.addEventListener("click", () => {
  if (ringCount >= 1000) {
    rps += 10;
    myRpsDisplay.innerText = rps;
    localStorage.setItem("localRpsCount", rps);
    saleAudio.play();
    ringCount -= 1000;
    const boost3 = setInterval(function () {
      ringCount += 10;
      myRingCountDisplay.innerText = ringCount;
    }, 1000);
    localStorage.setItem("localRingCount", ringCount);
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!",
    );
  }
});

button4.addEventListener("click", () => {
  if (ringCount >= 2000) {
    rps += 20;
    myRpsDisplay.innerText = rps;
    localStorage.setItem("localRpsCount", rps);
    saleAudio.play();
    ringCount -= 2000;
    const boost4 = setInterval(function () {
      ringCount += 20;
      myRingCountDisplay.innerText = ringCount;
    }, 1000);
    localStorage.setItem("localRingCount", ringCount);
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!",
    );
  }
});

button5.addEventListener("click", () => {
  if (ringCount >= 5000) {
    rps += 50;
    myRpsDisplay.innerText = rps;
    localStorage.setItem("localRpsCount", rps);
    saleAudio.play();
    ringCount -= 5000;
    const boost5 = setInterval(function () {
      ringCount += 50;
      myRingCountDisplay.innerText = ringCount;
    }, 1000);
    localStorage.setItem("localRingCount", ringCount);
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!",
    );
  }
});

button6.addEventListener("click", () => {
  if (ringCount >= 10000) {
    rps += 100;
    myRpsDisplay.innerText = rps;
    localStorage.setItem("localRpsCount", rps);
    saleAudio.play();
    ringCount -= 10000;
    const boost6 = setInterval(function () {
      ringCount += 100;
      myRingCountDisplay.innerText = ringCount;
    }, 1000);
    localStorage.setItem("localRingCount", ringCount);
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!",
    );
  }
});

button7.addEventListener("click", () => {
  if (ringCount >= 20000) {
    rps += 200;
    myRpsDisplay.innerText = rps;
    localStorage.setItem("localRpsCount", rps);
    saleAudio.play();
    ringCount -= 20000;
    const boost7 = setInterval(function () {
      ringCount += 200;
      myRingCountDisplay.innerText = ringCount;
    }, 1000);
    localStorage.setItem("localRingCount", ringCount);
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!",
    );
  }
});

button8.addEventListener("click", () => {
  if (ringCount >= 50000) {
    rps += 500;
    myRpsDisplay.innerText = rps;
    localStorage.setItem("localRpsCount", rps);
    saleAudio.play();
    ringCount -= 50000;
    const boost8 = setInterval(function () {
      ringCount += 500;
      myRingCountDisplay.innerText = ringCount;
    }, 1000);
    localStorage.setItem("localRingCount", ringCount);
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!",
    );
  }
});

button9.addEventListener("click", () => {
  if (ringCount >= 100000) {
    rps += 1000;
    myRpsDisplay.innerText = rps;
    localStorage.setItem("localRpsCount", rps);
    saleAudio.play();
    ringCount -= 100000;
    const boost9 = setInterval(function () {
      ringCount += 1000;
      myRingCountDisplay.innerText = ringCount;
    }, 1000);
    localStorage.setItem("localRingCount", ringCount);
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!",
    );
  }
});

button10.addEventListener("click", () => {
  if (ringCount >= 200000) {
    rps += 2000;
    myRpsDisplay.innerText = rps;
    localStorage.setItem("localRpsCount", rps);
    saleAudio.play();
    ringCount -= 200000;
    const boost10 = setInterval(function () {
      ringCount += 2000;
      myRingCountDisplay.innerText = ringCount;
    }, 1000);
    localStorage.setItem("localRingCount", ringCount);
  } else {
    alert(
      "Sorry, you can't afford that yet! Keep clicking the GIANT ring to collect more!",
    );
  }
});

// this isnt working at the moment. dont know why
if (ringCount == 50) {
  console.log(ringCount);
  segaAudio.play();
}

// await fetch
// await something.json()
// our upgrades will be an array of objects
// so loop through the array. can use forEach or a normal loop.
// use document.create elemtn to create each of my tags
// each item also needs a 'buy' buttom
// append to the dom
// to our buy buttons, event listner
// check if the user can afford to buy the item
// if we can afford it
// update the cps and add the 'increase' amount ot it
// take away the cost of the upgrade from your overall cookie count
// if you cant afford it
// do an alert and end the function
// look into 'toast' notifications if you wanna be fancy

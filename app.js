// step 1 - first of all, find an image for your big ring. upload it to your image folder. And add the image to your html document with an id.
// step 2 - add x4 <p> elements to your html, the 1st one is just a title for your total rings. I will give the title >Ring Balance<. The second one will be the (constantly changing) text display of the Ring Balance itself, so give this one an id. I will give mine id=ringBalance. the 3rd one is another title only (for the RPS - rings per second), will give mine the title >RPS<, and the 4th one is to be the variable text of the RPS, so give this one an ID too. I will use id=rps. Wrap them all up in a <div id=> to make it easier for CSS adjustment later. They wont have any values yet ofcourse (on the website) because we haven't programmed them. All you will see for now is the titles.
// step 3 - give js names to all the html id's (thus linking them to each other)

const bigRingDisplay = document.getElementById("bigRing");
const ringBalanceDisplay = document.getElementById("ringBalance");
const rpsDisplay = document.getElementById("rps");

const shopDisplay = document.getElementById("shop"); // later step

// link bigring audio clip to javascript
const ringAudio = new Audio("audio/sonic-grabs-a-ring.mp3");

// link saleaudio clip to javascript
const saleAudio = new Audio("audio/Cha_Ching_Register-Muska666-173262285.mp3");

// link resetaudio clip to javascript
const resetAudio = new Audio("audio/Voicy_Sonic ring loss.mp3");

// link landmark audio clip to javascript
const segaAudio = new Audio("audio/sega-hd.mp3");

const resetButton = document.getElementById("resetGame");

// step 4 - add an event listener to the large ring image.

bigRingDisplay.addEventListener("click", function () {
  console.log("click works"); // check the click works
  ringAudio.play();
  gameState.bank++;
  ringBalanceDisplay.innerText = gameState.bank;
});

// step 5 - lets give the Ring Balance and RPS a starting figure (so we can see it displayed on screen). We'll store this info in an array, this makes things easier later to call upon. We can call the objects inside whatever we want (as long as it makes sense to you). I will call them bank, rps and purchases.

let gameState = {
  // give the array a name. I will call it gameState
  bank: 100,
  rps: 1,
  purchases: [],
};

//now we tell the ringBalanceDisplay and rpsDisplay where to find the values to display, we are storing that info in the gameState array, under the text names "bank" and "rps". Now have a look at the webpage - it will display 100 and 1 as it's starting value.
ringBalanceDisplay.innerText = gameState.bank;

rpsDisplay.innerText = gameState.rps;

// step 6. We've done as much as we can now for the early stage.

//-----------------------RETRIEVE API DATA-------------------------
//-----------TRANSLATE JSON FORMAT INTO JAVASCRIPT FORMAT----------

// the last main task is the visual shop. Here we will allow users to spend the coins they have ammassed in the bank to buy RPS speed upgrades (speeding up the RPS - thus increasing the amount of rings automatically aquired per second. We must as part of this assignment, receive this data from a given API. An API acts like a waiter in a restaurant. You tell the waiter (the API) what you want from the kitchen (the server) and they bring it back to you. However, pulling info from an API is received in a slightly different format from js. It comes as in .json format. These are the steps to retrieve an API and how to translate it into readable javascript format.

// the API we need to grab the upgrade details from is located at https://cookie-upgrade-api.vercel.app/api/upgrades

// to retrieve an API we use special functions. Asychornous functions.
// synchornous -> happening at the same time
// asynchornous -> not happening at the same time

// Async functions, means the data received may not be in sync with the rest of the data available to js at the time. Because of time delays in fetching the data (for example, the server may be located in USA).

// Whenever we fetch data it must happen inside an async function. This basically tells js to go ahead and run all the other functions, and come back to fetch this async data when it can.

// so we start by creating an async function, and we use an inbuilt JS function called fetch()
// fetch - fetches! - we can use it to make an API request to a external website using our own js calling code.
// note, by requesting "fetch()"" on its own, if you console log the outcome, you will see it only ever fetches a "promise" of more data. Almost like a waiter saying "I'll get that to you when I can, the chef is very busy". This is no good, we can't move on until we are fed this required data, so we must be adamant to the waiter we dont want it to skip over this line until we have it. We do this by adding "await fetch" instead.

//so let's give this async function a name, I will call it getApi

async function getApi() {
  // and ask the function to save the API data we receive as a given name. i will call it apiJson. Remember this value will come to use in json format.
  const apiJson = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades",
  );
  console.log(apiJson); // this fetched repsonse comes back to us in .json format. now we tell our program how to read that data properly. I will save the translated data as readableData.

  // again, if we also dont add await, it will just return a promise (on the console log).
  const readableApi = await apiJson.json(); // .json() tells the function how to read/translate the data
  console.log(readableApi); // you will see the API in Js format
  return readableApi;
} // add a return so we can supply this translated data to other functions outside of this getApi {function}. If we don't, then this readable data value is reserved to only being readable within this function. We pass data from one function to another by adding the invoker line of the first function into the new one. As long as the invoker comes from outside of it's function it still calls it.

// that's it. you will see on the console log now the json data print first, followed by the js (readable) data.

// within this new value of "readableData" is an array of objects) saved within that given name of readableData. We need to now pull each object detail from that array by using either a loop for, or loop for each function. We want to do this from a seperate function (to keep the code clean and independant)

// before we do that, lets first create a shop <div> tag manually on the html. Give it an id "shop". Once we pull all this data from the API we are going to paste it into this (ready and waiting) div. Remember to link it up to the js (at the top of the screen too) with getElementbyId. I will save the <div> reference as shopDisplay

async function pullApiData() {
  const readableData = await getApi(); // this invoker can also receive the outcome returned from the returned value of the function it invokes (i.e readableApi), To cut confusion, in this function i will call it readableData.
  console.log(readableData); // you will see the same array as readableApi

  readableData.forEach(function (obj) {
    const divContainer = document.createElement("div"); // create a <div>
    divContainer.classList.add("shop-item"); //add a class="shop-item" to the <div>

    const itemName = document.createElement("p"); // create a p tag of...
    itemName.innerText = obj.name; // text displaying the name of the shop item for sale

    const itemCost = document.createElement("p"); // same for cost
    itemCost.innerText = `Cost: ${obj.cost}`;

    const itemIncrease = document.createElement("p"); // same for rps increase values
    itemIncrease.innerText = `CPS: ${obj.increase}`;

    const buyButton = document.createElement("button"); // create a button. give
    buyButton.classList.add("buy-button"); // give button a class name="buy-button"
    buyButton.innerText = "Buy"; // give button some text

    buyButton.addEventListener("click", function () {
      purchaseItem(obj); //invoker
    });

    divContainer.append(itemName, itemCost, itemIncrease, buyButton); // this stores all the elements in the <div>

    shop.append(divContainer); //this stores all the divs in the shop container
  });
}

pullApiData(); //invoker

function purchaseItem(obj) {
  // how to tell if the user can purchase something?
  // can the user even afford this?
  // early exit / guard clause
  console.log(obj);
  if (obj.cost > gameState.bank) {
    alert(`You cant buy that!!!!!!`);
    // I'm using an empty return here - not to return a value but to end the function.
    return;
  }

  gameState.bank -= obj.cost;
  gameState.rps += obj.increase;
  saleAudio.play();
}

function loadGame() {
  console.log(localStorage.getItem("gameState"));

  if (localStorage.getItem("gameState") === null) {
    return;
  }
  gameState = JSON.parse(localStorage.getItem("gameState"));
}

function saveGame() {
  localStorage.setItem("gameState", JSON.stringify(gameState));
}

// local storage is a requirement!!!
// just for neatness
function game() {
  loadGame();
  setInterval(function () {
    saveGame();
    gameState.bank = gameState.bank + gameState.rps;
    ringBalanceDisplay.innerText = gameState.bank;
    rpsDisplay.innerText = gameState.rps;
  }, 1000);
}

game();

function resetGame() {
  localStorage.clear();
  resetAudio.play();
  gameState = {
    bank: 0,
    rps: 1,
    purchases: [],
  };
}

resetButton.addEventListener("click", resetGame);

//doesnt work. not sure why???
//if (gameState.bank >= 100) {
// segaAudio.play();
//}

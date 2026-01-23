// so we are just going to make a simple timer. first of all let's make a simple function, one that says "hello world" on the console.log.

// function sayHello() {
//  console.log("Hello world!");
//}

// now we set the timer to display this function after so many seconds. setTimeout is the timer method, sayHello is the name of the function we want to trigger, and 5000 (milliseconds) is 5 seconds from page load.

//setTimeout(sayHello, 5000);

// refresh your live page and watch the console. After 5 seconds you will see Hello world! display. Clever eh?

// Another type of timer method used makes use of a callback argument, i.e. an arrow function //
// Timeout that runs an arrow function after 2 seconds
//setTimeout(() => {
//  console.log("Cool message!");
//}, 2000);

// again watch the console log. You should see "cool message!" appear first, followed by the "hello world!"

// Another timer method is an Interval method that we will set up to run every 1 second
// setInterval(() => {
// console.log("A second has passed...");
//}, 1000);

// the problem with the above interval timer (as it is at the moment) is it will keep doing this forever unless we give it instructions to stop. so we need to expand on this.

// we could paste the following code below the timer function.... clearInterval(), this tells the function to stop, but the problem with this, is by the time the function is about to log "A second has passed" it will have already (milliseconds later) read this clear command - and not had chance to run the timer function at all. By all means try this for yourself and see what happens in the console log.

// to overcome this, we can also put our "clearInterval" command on it's own "setTimeout" timer, to activate after so many seconds. As the interval timer is running every second, we will set up the clear command's setTimeout timer to fire after 5 seconds.

// we will also take this opportunity to make our setInterval timer a named timer. I.e. give it a unique ID name (which when dealing with many timers, it helps to have each one named, best to get into this practice now)

//const myInterval = setInterval(() => {
// console.log("I'm a message!");
//}, 1000);

// this clearInterval() will no longer work as it did before, because we have made the setInterval a named timer now. (i.e. it is no longer just a default timer)

// clearInterval(); // doesnt work anymore. Needs the timer's argument value between the () which we called myInterval

// remember, if we just use clearInterval(myInterval) - it will fire before the message of the function fires.

// So we set the clear command to activate after 5 seconds with a setTimeout function. Like so...

//setTimeout(() => {
// clearInterval(myInterval);
//}, 5000);

// you will see on the console that after 5 seconds the clear command triggers, and the Interval messages now stop after the 5th.

// Let's try something fun now. A bomb will go off in 10 seconds!

// step 1 - make a timeout console log message
//const myBombTimer = setTimeout(() => {
// console.log("BOOM!!!!");
//}, 10000);

// We can use a clearTimeout to clear the timer and defuse the bomb - if somebody clicks a defuse button in time. Look on the index.html where you will see I've added a button called "defuseBtn"

// now let's link our js up to that html button and call it myDefuseBtn
//const myDefuseBtn = document.getElementById("defuseBtn");

// add an event listener for when a user clicks on it
//myDefuseBtn.addEventListener("click", () => {
// clearTimeout(myBombTimer);
//});

// give it a try on the console. Wait 10 seconds and you will see BOOM!!!, press the defuse button within 10 seconds and you will have sent the clear command to stop the bomb.

//We can also use an array setup like this to create a kind of loop //through an array - pasting each letter within the array every second.

//const array = ["a", "b", "c", "d", "e"];
//let i = 0;
//const arrayInterval = setInterval(() => {
//console.log(array[i]);
//i++;
//if (i >= array.length) {
// clearInterval(arrayInterval);
// }
//}, 1000);

//----------------------------------------------------

const nameContainer = document.querySelector(".name-container");

const costContainer = document.querySelector(".cost-container");

// step 1. we first need to create a ring gif image on the document. give it an id name.
// step 2. We need to create a p tag element for displaying the current rings being created per second. As this text display will be a variable (changing all the time) we must also give it an id name.
// step 3. We need to create a p tag element for displaying the total rings currently made. As this text display will be a variable (changing all the time) we must also give it an id name.
// step 4 & 5 - We will also create a p tag element to give step 2 a visable label, so the users understand what it is showing.
// step 4. we need to create a p tag element

// DEFAULT VALUES. ignore this code for now. Will be explained later. But without them, none of the code below will work, as the codes below need to know the starting values before they can work.
let ringCount = 0;
let rps = 1;

// now link the 2 document ptags with ids to js. Give them a name. I call them something similar to the document so they're self explanitory, but I also add "my" to the beginning of each. Helps me acknowledge it's a js value at this end.
const myRingCountDisplay = document.getElementById("ringCount");
const myRpsDisplay = document.getElementById("rps");

//also link the documents image tag to a js value as well.
const myImage = document.querySelector("img");

// now tell your myRingCountDisplay to display whatever it's value is as a text value. Which is then pasted in between the <p> tags on the document (with the id of ringCount). This won't display anything just yet as we need to set what value the ringCount starts at. Which will of course be zero. But we'll do that later.
myRingCountDisplay.innerText = ringCount;

// now let's make the large spinning ring recognise when it has been clicked. Add an event listener to it. Then a function to add 1 to the ringCount value every time it's clicked. If you check your console at this stage you will see the console is detecting each click. But it's not pasting it's updated value to the page. This is because the code runs down this page, and it needs reminding to change the innerText value again. So add this line, and see what happens
myImage.addEventListener("click", function () {
  ringCount++;
  myRingCountDisplay.innerText = ringCount;
  console.log(ringCount);
});

// we also want the rings to keep topping up the bank even when nobody is clicking the big ring. So let's set up an interval timer like so. This will add an extra ring to the bank every second. And also remind the innerText to update each time. Again, by not adding this reminder - the total in the bank will only update when the big ring is clicked (as we put a reminder in that function too).
setInterval(function () {
  ringCount++;
  myRingCountDisplay.innerText = ringCount;
}, 1000);
// now we've got this far. We need to set some default values for what the counters values start at when the page is first loaded. We want the bank to be zero, and the rps to be 1. We havent yet programmed the rpm but we know when we do - we'll start it off adding just 1 ring per second. Add these default values at the very top of this js page, we like to add default values as high as possible so the page receives all neseccary data before the rest of the script runs. I will label these at the top of this page as DEFAULT VALUES.

// remember local storage is a requirement of this assignment!!

// the last main task is the shop. Here we will allow users to spend the coins they have ammassed in the bank to buy speed upgrades (speeding up the RPS - thus increasing the amount of rings automatically aquired per second. We must as part of this assignment, receive this data from a given API. An API acts like a waiter in a restaurant. You tell the waiter (the API) what you want from the kitchen (the server) and they bring it back to you. However, pulling info from an API is received in a slightly different format from js. It comes as in .json format. These are the steps to retrieve and implement it.

// https://cookie-upgrade-api.vercel.app/api/upgrades

// synchornous -> happening at the same time
// asynchornous -> not happening at the same time

// Async functions, means the data received may not be in sync with the rest of the data available to js at the time. Because of the time it takes to fetch the data (for example, the server may be in USA).

// Whenever we fetch data it must happen inside an async function. This basically tells js to go ahead and run all the other functions, and come back to fetch this async data when it can.

// so we start by creating an async function, and we use an inbuilt JS function called fetch()
// fetch - fetches! - we can use it to make a request to a website in our own js code.
// note, by requesting fetch() on its own howeverw, if you console log the outcome, it will only ever fetch a "promise" of more data. Almost like the waiter saying "I'll get that to you when I can, the chef is very busy". This is no good, we cant move on until we are fed this data, so we must be adamant we dont want it to skip over this line until we have it. We do this by adding "await fetch".

//give this async function a name, I will call it fetchApi

async function fetchApi() {
  // and ask the function to save the API data we receive as a given name. i will call it ApiResponse
  const apiResponse = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades",
  );
  console.log(apiResponse); // this fetched repsonse comes back to us in .json format. now we tell our program how to read that data. I will save the translated data as readableData.

  // again, if we also dont add await, it will just return a promise (on the console log).
  const readableData = await apiResponse.json();
  console.log(readableData);
  return readableData;

  // that's it. you will see on the console log now the json data first, followed by the js (readable) data.

  //to recap
  // fetch gets the data
  // .json() reads the data

  // and now we have that object in our own code and can use it as we like.
}

//--------------------------------------------------
//----------------PULL NAME DATA---------------------
//now we need to create a loop function to pull all the NAME properties from the API array objects.
async function pullName() {
  const readableData = await fetchApi();
  for (let i = 0; i < readableData.length; i++) {
    const madeNameElement = document.createElement("div");
    madeNameElement.innerText = readableData[i].name;
    madeNameElement.addEventListener("click", function () {
      console.log(readableData[i].name);
    });

    nameContainer.append(madeNameElement);
  }
}

pullName(); // invoker command

//--------------------------------------------------
//----------------PULL COST DATA-------------------
//now we need to create a loop function to pull all the NAME properties from the API array objects.
async function pullCost() {
  const readableData = await fetchApi();
  for (let i = 0; i < readableData.length; i++) {
    const madeCostElement = document.createElement("div");
    madeCostElement.innerText = readableData[i].cost;
    madeCostElement.addEventListener("click", function () {
      console.log(readableData[i].cost);
    });

    costContainer.append(madeCostElement);
  }
}

pullCost(); // invoker command

//--------------------------------------------------
//----------PULL INCREASE DATA---------------------
//now we need to create a loop function to pull all the NAME properties from the API array objects.
async function pullIncrease() {
  const readableData = await fetchApi();
  for (let i = 0; i < readableData.length; i++) {
    const madeIncreaseElement = document.createElement("div");
    madeIncreaseElement.innerText = readableData[i].increase;
    madeIncreaseElement.addEventListener("click", function () {
      console.log(readableData[i].increase);
    });

    increaseContainer.append(madeIncreaseElement);
  }
}

pullIncrease(); // invoker command
//-------------------------------------------------------

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

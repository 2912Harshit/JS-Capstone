// Main entry point for the application
// import { initializeComponents } from "./components.js";
// import { fetchData } from "./api.js";
// import "../css/tailwind.css";
// import "../css/components.css";
// import "../css/utilities.css";

// Initialize the application
// document.addEventListener("DOMContentLoaded", async () => {
//   console.log("Application initialized");

//   // Initialize components (sliders, tabs, accordions)
//   initializeComponents();

//   // Optionally fetch data
//   // const data = await fetchData('/api/posts');
// });

let guestBtn = document.getElementById("guestBtn");
let guestMenu=document.getElementById("guestMenu");

guestBtn.addEventListener("click",()=>{
  guestMenu.classList.toggle("hidden");
})

let adultMinusBtn=document.getElementById("adultMinusBtn");
let adultPlusBtn=document.getElementById("adultPlusBtn");
let adultCountSpan=document.getElementById("adultCount");

let childMinusBtn=document.getElementById("childMinusBtn");
let childPlusBtn=document.getElementById("childPlusBtn");
let childCountSpan=document.getElementById("childCount");

let guestText=document.getElementById("guestText");

adultMinusBtn.addEventListener("click",()=>changeCount(adultCountSpan,-1));
adultPlusBtn.addEventListener("click",()=>changeCount(adultCountSpan,1));
childMinusBtn.addEventListener("click",()=>changeCount(childCountSpan,-1));
childPlusBtn.addEventListener("click",()=>changeCount(childCountSpan,1));


function changeCount(countSpan,delta){
  console.log("hey");
  let currentCount=parseInt(countSpan.innerText);
  let newCount=currentCount+delta;
  if(newCount<0){
    newCount=0;
  }
  countSpan.innerText=newCount;
  guestText.innerText=`${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
}

const tabs = document.querySelectorAll(".tab");
const indicator = document.getElementById("indicator");

function moveIndicator(button) {
  indicator.style.width = button.offsetWidth + "px";

  indicator.style.height = button.offsetHeight + "px";

  indicator.style.left = button.offsetLeft + "px";

  indicator.style.top = button.offsetTop + "px";
}

moveIndicator(tabs[0]);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    moveIndicator(tab);
    tabs.forEach((tab)=>{
      tab.classList.remove("text-amber-300");
      tab.classList.add("text-gray-500"); 
    });
    tab.classList.add("text-amber-300");
    tab.classList.remove("text-gray-500");
  });
});

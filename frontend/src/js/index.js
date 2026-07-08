// Main entry point for the application
// import { initializeComponents } from "./components.js";
// import { fetchData } from "./api.js";
// import "../css/tailwind.css";
// import "../css/components.css";
// import "../css/utilities.css";

import { renderCars, renderTours } from "./components.js";


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

adultMinusBtn.addEventListener("click",()=>{
  changeCount(adultCountSpan,-1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
});
adultPlusBtn.addEventListener("click",()=>{
  changeCount(adultCountSpan,1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
});
childMinusBtn.addEventListener("click",()=>{
  changeCount(childCountSpan,-1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
});
childPlusBtn.addEventListener("click",()=>{
  changeCount(childCountSpan,1);
  guestText.innerText = `${adultCountSpan.innerText} Adults, ${childCountSpan.innerText} Children`;
});


function changeCount(countSpan,delta){
  console.log("hey"); 
  let currentCount=parseInt(countSpan.innerText);
  let newCount=currentCount+delta;
  if(newCount<0){
    newCount=0;
  }
  countSpan.innerText=newCount;
  
}
let daysMinusBtn=document.getElementById("daysMinusBtn");
let daysPlusBtn=document.getElementById("daysPlusBtn");
let nightMinusBtn=document.getElementById("nightMinusBtn");
let nightPlusBtn=document.getElementById("nightPlusBtn");

let daysCount=document.getElementById("daysCount");
let nightCount=document.getElementById("nightCount");

let categories=document.querySelectorAll("#cat_options")
// let duration_days=document.getElementById("duration_days");
// let duration_nights=document.getElementById("duration_nights");
let tourRatings=document.querySelectorAll(".tourRating");
let priceFrom=document.getElementById("ffrom");
let priceTo=document.getElementById("fto");

//searchFilter button
let searchFilter=document.getElementById("searchFilter");

//tour filter buttons
let categoryBtn=document.getElementById("category-btn");
let durationBtn=document.getElementById("duration-btn");
let ratingBtn=document.getElementById("rating-btn");
let priceRangeBtn=document.getElementById("price-range-btn");

let lowSortBtn=document.getElementById("lowSort");
let highSortBtn=document.getElementById("highSort");

let sortBtn=document.querySelectorAll(".sort");


let tourFilters={
  category:"all",
  days:0,
  nights:0,
  rating:1,
  priceFrom:0,
  priceTo:Number.MAX_SAFE_INTEGER,
  sort:0
};


//sort event listener
sortBtn.forEach((btn)=>{
  btn.addEventListener("click",()=>{
    sortBtn.forEach((btn)=>{
      btn.classList.remove("text-white");
      btn.classList.remove("bg-black");
    });
    btn.classList.add("bg-black");
    btn.classList.add("text-white");
    tourFilters.sort=parseInt(btn.value);
  })
})


//searchFilter event listener
searchFilter.addEventListener("click",()=>{
  getTours();
})

//price range event listener
priceFrom.addEventListener("change",()=>{
  tourFilters.priceFrom=parseInt(priceFrom.value);
  console.log(tourFilters);
})
priceTo.addEventListener("change",()=>{
  tourFilters.priceTo=parseInt(priceTo.value);
  console.log(tourFilters);
})

//rating event listener for each button
tourRatings.forEach((tourRating)=>{
  tourRating.addEventListener("click",()=>{
    // console.log(tourRating.innerHTML);
    // console.log(ratingBtn.innerText);
    // console.log("rati");
    tourFilters.rating=parseInt(tourRating.value);
    ratingBtn.innerHTML=tourRating.innerHTML;
    console.log(tourFilters);
  })
})

//duration event listeners
daysMinusBtn.addEventListener("click",()=>{
  changeCount(daysCount,-1);
  tourFilters.days=parseInt(daysCount.innerText);
  durationBtn.innerText=`${daysCount.innerText} D & ${nightCount.innerText} N`
  // console.log(durationBtn.innerText);
  console.log(tourFilters);
  
});
daysPlusBtn.addEventListener("click",()=>{
  changeCount(daysCount,1);
  tourFilters.days=parseInt(daysCount.innerText);
  durationBtn.innerText=`${daysCount.innerText} D & ${nightCount.innerText} N`
  console.log(tourFilters);
});
nightMinusBtn.addEventListener("click",()=>{
  changeCount(nightCount,-1);
  tourFilters.nights=parseInt(nightCount.innerText);
  durationBtn.innerText=`${daysCount.innerText} D & ${nightCount.innerText} N`
  console.log(tourFilters);
});
nightPlusBtn.addEventListener("click",()=>{
  changeCount(nightCount,1);
  tourFilters.nights=parseInt(nightCount.innerText);
  durationBtn.innerText=`${daysCount.innerText} D & ${nightCount.innerText} N`
  console.log(tourFilters);
});



//category options
categories.forEach((cat)=>{
  cat.addEventListener("click",()=>{
    tourFilters.category=cat.value.toLowerCase();
    categoryBtn.innerText=cat.innerText;
    console.log(tourFilters);
  })
})

// sliding indicator
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

let tourSection=document.getElementById("tourSection");


async function getTours(){
  try{
    console.log("entered")
    const response= await fetch("./src/data/tour_cards.json");
    if(!response.ok){
      throw new Error("Failed to load tours");
    }
    const tours=await response.json();
    console.log(tours);
    renderTours(tourSection,tours,tourFilters);
  }catch(error){
    console.log(error.message)
  }
}
getTours();

let nextBtn=document.getElementById("nextBtn");
let prevBtn=document.getElementById("prevBtn");
let slider=document.getElementById("slider");

let currentIndex=0;

const visibleCards=3;
let maxIndex=slider.children.length-visibleCards;
const gap= 16;

const carFilters={
  brand:new Set()
}
async function getCars() {
  try {
    console.log("entered");
    const response = await fetch("./src/data/cars_cards.json");
    if (!response.ok) {
      throw new Error("Failed to load cars");
    }
    const cars = await response.json();
    console.log(cars);
    renderCars(slider, cars,carFilters);
    // updateSilder();
  } catch (error) {
    console.log(error.message);
  }
}
getCars();


// carousel slider


function updateSilder(){
  const card=slider.children[0];
  const move=card.offsetWidth+gap;
  maxIndex=slider.children.length-visibleCards;
  
  slider.style.transform = `translateX(-${currentIndex * move}px)`;

}

nextBtn.addEventListener("click",()=>{
  updateSilder();
  if(currentIndex>=maxIndex)return;
  currentIndex++;
  if(currentIndex==maxIndex){
    nextBtn.classList.remove("bg-black");
    nextBtn.classList.remove("text-white");
  }else if(currentIndex>0){
    prevBtn.classList.add("bg-black");
    prevBtn.classList.add("text-white");

  }
  // console.log(slider.children.length);
  slider.style.transform=`translateX(-${currentIndex*(slider.children[0].offsetWidth+gap)}px)`;
  
});
prevBtn.addEventListener("click",()=>{
  updateSilder();
  if(currentIndex==0)return;
  currentIndex--;
  if(currentIndex==0){
    prevBtn.classList.remove("bg-black");
    prevBtn.classList.remove("text-white");
  }else if(currentIndex<maxIndex){
    nextBtn.classList.add("bg-black");
    nextBtn.classList.add("text-white");
  }
  slider.style.transform=`translateX(-${currentIndex*(slider.children[0].offsetWidth+gap)}px)`;

});




// carLogos btn
let carLogos=document.querySelectorAll(".car-logo");
// let brandCount=0;

carLogos.forEach((logo)=>{
  logo.addEventListener("click",()=>{
    logo.classList.toggle("active");
    if(logo.classList.contains("active")){
      carFilters.brand.add(logo.value);
      // carFilters.brand=logo.value;
      logo.classList.remove("bg-white");
      logo.classList.add("bg-cyan-300", "shadow-2xl", "-translate-y-2");
    }else{
      carFilters.brand.delete(logo.value);
      logo.classList.add("bg-white");
      logo.classList.remove("bg-cyan-300", "shadow-2xl", "-translate-y-2");
    }
    getCars();
  })
})

import axios from "axios";

import Notiflix from 'notiflix';

import { Report } from 'notiflix/build/notiflix-report-aio';

const tastyTreats = axios.create({
    baseURL:"https://tasty-treats-backend.p.goit.global/api",
});

async function getAllEvents(){
  const response = await tastyTreats.get("/events"); 
    return response;
}

const refs={
    images: document.querySelector('.images'),
    btnOrder: document.querySelector('.btn-order'),  
}


getAllEvents().then(({data})=>{
    console.log(data)
    const markup = createMarkup(data);
    refs.images.insertAdjacentHTML('beforeend',markup);     
    // Swiper.use([Navigation, Pagination]);
    const swiper = new Swiper('.swiper', {    
      // Optional parameters  
      
      effect: 'cube',
      cubeEffect: {
      slideShadows: false,
      
    },
      autoplay: {
    delay: 3000,
    disableOnInteraction:false,    
    },
    mousewheel: {
    invert: true,
    
    },            
      loop: true,       
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',  
        clickable: true,
        
      },      
    });
}).catch(
  onError
)


function onError(){
  Notiflix.Report.warning(
    'ERROR',
    'Oops, something went wrong 🥺. Please try reloading the page!',
    'CLOSE',
    {
      width: '360px',
      svgSize: '120px',
    },
  );
}

function createMarkup(events){
return events.map(({cook,topic:{name,area,imgUrl,previewUrl}}) =>{
  const markup = `
<div class="swiper-container swiper-slide">
  <div class="image cook">
   <img class="cook-img" src="${cook.imgUrl}" alt="${cook.name}">
   </div>
  <div class="image first-dish">
   <img class="first-dish-img" src="${previewUrl}" alt="${name}">
   <div class="dish-desc">
   <h3 class="dish-name">${name}</h3>
   <p class="dish-area">${area}</p>
   </div>
    </div>
   <div class="image second-dish">
   <img class="second-dish-img" src="${imgUrl}" alt="${name}" >
    </div>
</div>
  ` ;
  return markup; 
}).join("");
};
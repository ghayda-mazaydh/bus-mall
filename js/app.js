'use strict'
function Products(title, src) {
  this.title = title;
  this.src = src;
  this.clickCounter = 0;
  this.shownCounter = 0;
  Products.all.push(this);
}
Products.roundCounter = 0;
Products.roundVotingLimit = 25;
Products.all = [];

Products.container = document.getElementById('busMall-container');

Products.firstImage = document.getElementById('first-image');
Products.secondImage = document.getElementById('second-image');
Products.thirdImage = document.getElementById('third-image');

Products.firstImageTitle = document.getElementById('first-image-title');
Products.secondImageTitle = document.getElementById('second-image-title');
Products.thirdImageTitle = document.getElementById('third-image-title');

Products.firstObject = null;
Products.secondObject = null;
Products.thirdObject = null;

new Products('bag', 'img/bag.jpg');
new Products('banana', 'img/banana.jpg');
new Products('bathroom', 'img/bathroom.jpg');
new Products('boots', 'img/boots.jpg');
new Products('breackfast', 'img/breakfast.jpg');
new Products('bubblegum', 'img/bubblegum.jpg');
new Products('chair', 'img/chair.jpg');
new Products('cthulhu', 'img/cthulhu.jpg');
new Products('dog-duck', 'img/dog-duck.jpg');
new Products('dragon', 'img/dragon.jpg');
new Products('pen', 'img/pen.jpg');
new Products('pet-sweep', 'img/pet-sweep.jpg');
new Products('scissors', 'img/scissors.jpg');
new Products('shark', 'img/shark.jpg');
new Products('sweep', 'img/sweep.png');
new Products('tauntaun', 'img/tauntaun.jpg');
new Products('unicorn', 'img/unicorn.jpg');
new Products('usb', 'img/usb.gif');
new Products('water-can', 'img/water-can.jpg');
new Products('wine-glass', 'img/wine-glass.jpg');

function renderNewProducts() {
  var forbidden = [Products.firstObject, Products.secondObject, Products.thirdObject];
  do {
    Products.firstObject = getRandomProducts();
  } while (forbidden.includes(Products.firstObject))
  forbidden.push(Products.firstObject);
  do {
    Products.secondObject = getRandomProducts();
  } while (forbidden.includes(Products.secondObject))
  forbidden.push(Products.secondObject);
  do {
    Products.thirdObject = getRandomProducts();
  } while (forbidden.includes(Products.thirdObject));

  Products.firstObject.shownCounter++;
  Products.secondObject.shownCounter++;
  Products.thirdObject.shownCounter++;

  var firstProductImageElement = Products.firstImage;
  var secondProductImageElement = Products.secondImage;
  var thirdProductImageElement = Products.thirdImage;

  firstProductImageElement.setAttribute('src', Products.firstObject.src);
  firstProductImageElement.setAttribute('alt', Products.firstObject.title);

  secondProductImageElement.setAttribute('src', Products.secondObject.src);
  secondProductImageElement.setAttribute('alt', Products.secondObject.title);

  thirdProductImageElement.setAttribute('src', Products.thirdObject.src);
  thirdProductImageElement.setAttribute('alt', Products.thirdObject.title);


  Products.firstImageTitle.textContent = Products.firstObject.title;
  Products.secondImageTitle.textContent = Products.secondObject.title;
  Products.thirdImageTitle.textContent = Products.thirdObject.title;
}

function getRandomProducts() {
  var index = Math.floor(Math.random() * Products.all.length);
  return Products.all[index];
}
function randomInRange(min, max) {
  var range = max - min + 1;
  var rand = Math.floor(Math.random() * range) + min
  return rand;
}

function newTotals() {
  var productsList = document.getElementById('report');
  productsList.innerHTML='';
      var li = document.createElement('li');
      productsList.appendChild(li);
      for (var i = 0; i < Products.all.length; i++) {
          var list = Products.all[i];
          li = document.createElement('li');
          productsList.appendChild(li);
          li.textContent=  list.title + " has (" + list.clickCounter + ") votes and was shown (" + list.shownCounter + ") times.";
      }}
    
function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;
}

function clickHandler(event) {

  var clickedId = event.target.id;
  var productClicked;


  if (clickedId === 'first-image') {
    productClicked = Products.firstObject;
  } else if (clickedId === 'second-image') {
    productClicked = Products.secondObject;
  } else if (clickedId === 'third-image') {
    productClicked = Products.thirdObject;
  } else {
    console.log('the product you just clicked is', clickedId);
  }
  if (productClicked) {
    productClicked.clickCounter++;
    Products.roundCounter++;

    
if (Products.roundCounter === Products.roundVotingLimit) {
  newTotals();
      alert('your clicking attempts is over!');
      chartToBeShown();
      Products.container.removeEventListener('click', clickHandler);
     ////////////////////////////
      var productString = JSON.stringify(Products.all);
      localStorage.setItem('products', productString);
    /////////////////////////
    } else {
      renderNewProducts();
    }
  }
}function chartToBeShown() {
  var productName = [];
  var clickedTimes = [];
  var shownTimes = [];
  for (let i = 0; i < Products.all.length; i++) {
    var cha = Products.all[i];
    productName.push(cha.title + 'Votes');
   productName.push(cha.title + 'Shown');
   clickedTimes.push(cha.clickCounter);
   shownTimes.push(cha.shownCounter);
  }
 var ctr = document.getElementById('chartjs').getContext('2d');
 var chart = new Chart(ctr, {
        type: 'bar',
        data: {
        labels: ['Bag ', 'Banana ', 'Bathroom ', 'Boots ', 'Breakfast ', 'Bubblegum ', 'Chair ','Cthulhu ','Dog-Duck ','Dragon ','Pen ','Pet-Sweep ','Scissors ','Shark ','Sweep ','Tauntaun ','Unicorn ','USB ','Water-Can ','Wine-Glass '],
        datasets: [
          {
            label: 'number of votes',
            backgroundColor: ['black','black','black','black','black','black','black','black','black','black','black','black','black','black','black','black','black','black','black','black'],
            borderColor: ['white'],
            data: clickedTimes,
          },
          {
            label: 'shown times',
            backgroundColor: ['yellow','yellow',' yellow','yellow','yellow','yellow',' yellow','yellow','yellow','yellow',' yellow','yellow','yellow','yellow',' yellow','yellow','yellow','yellow',' yellow','yellow',],
            borderColor: ['white'] ,
            data: shownTimes,
          }
      ]
    },
       options: {}
 });
 }
 function getStoredProducts() {

  // retreive the stored into about list of product
  var productString = localStorage.getItem('products');

  if(productString) {
    
    var rawObjectArray = JSON.parse(productString);

    for(var i=0; i < rawObjectArray.length; i++) {
      var rawObject = rawObjectArray[i];
      var currentInstance = Products.all[i];
      currentInstance.clickCounter = rawObject.clickCounter;
      currentInstance.shownCounter = rawObject.shownCounter;
    }
  }
}

getStoredProducts();
 Products.container.addEventListener('click', clickHandler);
//  newTotals();
 renderNewProducts();
 chartToBeShown();


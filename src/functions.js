import {getRandomComment, entreesComments, sidesComments, breakfastComments} from './comments.js';

export function serveLunch(wellcome, menuRendered, customOptionsRendered, Lunch,standardPrice){
  let shoppingCart = [];
  let customCart = [];
  let itemCustomisation = null;  
  let partialOrder = null;
  let itemOrdered = null;
  let totalCustoms = 0;
  let totalPrice = 0;

  let seeMenu = prompt(wellcome,'Yes');
 
  if (seeMenu.toLowerCase() === 'yes') {
    
    while(itemOrdered === null){
      partialOrder = prompt(menuRendered + 'Please, select a main dish by typing its code.');
      itemOrdered = Lunch.getMainDishByCode(partialOrder);
    
      if (itemOrdered === null) {
          confirm('Sorry, something went wrong. Please enter a valid main dish code.');
        }
    }
    
    shoppingCart.push(itemOrdered);
    itemCustomisation = prompt(`${getRandomComment(entreesComments)}. Do you wish to customise your selection?`, 'Yes');

    while (itemCustomisation.toLowerCase() === 'yes') {
      itemOrdered = null;
      while(itemOrdered === null){
        partialOrder = prompt(customOptionsRendered + 'Please, select an option by typing its code.');
        itemOrdered = Lunch.getCustomByCode(partialOrder);
      
        if (itemOrdered === null) {
            confirm('Sorry, something went wrong. Please enter a valid option code.');
        }
      }
    
    customCart.push(itemOrdered);
    
    itemCustomisation = prompt('Do you wish to further customise your selection?', 'No');
    }
  }

  totalCustoms = getCustomsPrice(customCart);
    
  totalPrice = totalCustoms + getCartPrice(shoppingCart, standardPrice);

  seeMenu = prompt(`Your order ascends to ${totalPrice} €. Would you like to order some sides?`,'Yes');

  while (seeMenu.toLowerCase() === 'yes') {
    itemOrdered = null;
    while(itemOrdered === null){
      partialOrder = prompt(menuRendered + 'Please, select a side dish by typing its code.');
      itemOrdered = Lunch.getSideDishByCode(partialOrder);
    
      if (itemOrdered === null) {
          confirm('Sorry, something went wrong. Please enter a valid side dish code.');
      }
    }
    
    shoppingCart.push(itemOrdered);
    
    itemCustomisation = prompt(`${getRandomComment(sidesComments)}. Do you wish to customise your selection?`, 'Yes');

    while (itemCustomisation.toLowerCase() === 'yes') {
      itemOrdered = null;
      while(itemOrdered === null){
        partialOrder = prompt(customOptionsRendered + 'Please, select an option by typing its code.');
        itemOrdered = Lunch.getCustomByCode(partialOrder);
     
        if (itemOrdered === null) {
            confirm('Sorry, something went wrong. Please enter a valid option code.');
        }
      }
      customCart.push(itemOrdered);
      itemCustomisation = prompt('Do you wish to further customise your selection?', 'No'); 
    }

    totalCustoms = getCustomsPrice(customCart);
  
    totalPrice = totalCustoms + getCartPrice(shoppingCart, standardPrice);
    
    seeMenu = prompt(`Your order ascends to ${totalPrice} €. Would you like to order another side dish?`,'Yes');
  }
}

export function serveBreakfast(wellcome, menuRendered, customOptionsRendered, Lunch){
  let shoppingCart = [];
  let customCart = [];
  let partialOrder = null;
  let itemOrdered = null;
  let totalPrice = 0;
  let itemCustomisation = null;  
  let totalCustoms = 0;
  
  let seeMenu = prompt(wellcome,'Yes');

  while (seeMenu.toLowerCase() === 'yes') {
    itemOrdered = null;
    while(itemOrdered === null){
      partialOrder = prompt(menuRendered + 'Please, select a dish by typing its code.');
      itemOrdered = Lunch.getBreakfastDishByCode(partialOrder);
    
      if (itemOrdered === null) {
          confirm('Sorry, something went wrong. Please enter a valid dish code.');
      }
    }
    
    shoppingCart.push(itemOrdered);
    
    itemCustomisation = prompt(`${getRandomComment(breakfastComments)}. Do you wish to customise your selection?`, 'Yes');

    while (itemCustomisation.toLowerCase() === 'yes') {
      itemOrdered = null;
      while(itemOrdered === null){
        partialOrder = prompt(customOptionsRendered + 'Please, select an option by typing its code.');
        itemOrdered = Lunch.getCustomByCode(partialOrder);
      
        if (itemOrdered === null) {
            confirm('Sorry, something went wrong. Please enter a valid option code.');
        }
      }
    
    customCart.push(itemOrdered);
    
    itemCustomisation = prompt('Do you wish to further customise your selection?', 'No');
    }

    totalCustoms = getCustomsPrice(customCart);
  
    totalPrice = totalCustoms + shoppingCart.reduce((total, item) => {
      return total + item.price;
    },0);

    seeMenu = prompt(`Your order ascends to ${totalPrice} €. Would you like to order another dish?`,'Yes');
  }
}

export function getServingMeal(currentTime){
    if (currentTime > 8 && currentTime < 13) {
        return "breakfast";
    } else if (currentTime > 13 && currentTime < 20){
        return "lunch";
    } else if (currentTime > 20 && currentTime < 24){
        return "dinner";
    } else {
        return null;
    }
}

export function renderCustomOptions(Lunch){
  let stringMenu = "Customisation Options:\nCode Name Description Price\n"; 

  Lunch.dishes.forEach((element) => {
    if(element.kind === 'custom'){
      stringMenu += `${element.renderDish()}\n`;
    }
  });
    
  return stringMenu;  
} 

export function renderLunch(Lunch, servingMeal){
  let stringMenu = "Main dishes:\nCode Name Description Price\n"; 

  if (servingMeal === 'lunch' || servingMeal === 'dinner'){
    const isDinner= (servingMeal === 'dinner') ? true: false;
    Lunch.dishes.forEach((element) => {
        if(element.kind === 'entree'){
          stringMenu += `${element.renderDish()}\n`;
        }
    });
    
    stringMenu += 'Sides:\nCode Name Description Price\n'
    Lunch.dishes.forEach((element) => {
      if(element.kind === 'side'){
        stringMenu += `${element.renderDish()}\n`;
      }  
    });
  } else if (servingMeal === 'breakfast'){
  
    stringMenu = "Breakfast Special Dishes:\nCode Name Description Price\n";
    
    Lunch.dishes.forEach((element) => {
        if(element.kind === 'breakfast'){
          stringMenu += `${element.renderDish()}\n`;
        }
    });
  } else if (servingMeal === null){
    stringMenu = null;
  } else {
    throw new Error('An error rendering the menu has accurred. Please, contact the waiter.');
  }
  return stringMenu;  
} 
  
export function getCartPrice(cart,standardPrice){
    let numMains = 0;
    let numSides = 0;

    if (cart.length < 3) {
      return cart.reduce((total, item) => {
        return total + item.price;
      },0);
      
    } else if (cart.length === 3) {
      cart.forEach((item) => {
        if(item.kind == 'entree'){
          numMains++;
        };
        if(item.kind == 'side'){
          numSides++;
        };
      });
        
      if(numMains == 1 && numSides === 2){
          return standardPrice;
      } else {
        return cart.reduce((total, item) => {
          return total + item.price;
        },0); 
      }
    } else {
      let totalBill = 0;
      let sidesPrices = [];
      let mainsPrices = [];
      
      cart.forEach((item) => {
        if(item.kind == 'entree'){
          mainsPrices.push(item.price);
        };
        if(item.kind == 'side'){
          sidesPrices.push(item.price);
        };
      });
      
      if(mainsPrices.length === 1){
        let extraSides = sidesPrices.sort((a, b) => b - a);
        extraSides = extraSides.slice(2); //The 2 most expensive are in the menu
        totalBill = standardPrice + extraSides.reduce((total, item) => {
          return total + item;
        },0);
        return totalBill;
      
      } else if (mainsPrices.length === 0) {
          totalPrice = cart.reduce((total, item) => {
          return total + item.price;
        },0); 
      } else {
        throw new Error('An error computing your bill has occurred. Please, contact the waiter.');
      }
    } 
}

export function getCustomsPrice(cart){
  return cart.reduce((total, item) => {
      return total + item.price;
    },0);
}

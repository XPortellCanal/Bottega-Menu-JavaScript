import moment from 'moment';
import {Menu} from './classes.js';
import {getServingMeal, renderLunch, renderCustomOptions, serveLunch, serveBreakfast} from './functions.js';

const currentTime = moment().get('hour');
const currentMeal = getServingMeal(currentTime);

var standardPrice = (currentMeal === 'lunch')? 12: 20;

var Lunch = new Menu();
Lunch.newDish(11, 'entree', 'Meat',  'Grilled beef with sauce', 5);
Lunch.newDish(12, 'entree', 'Hamburguer', 'Grilled beef burguer', 4.5);
Lunch.newDish(13, 'entree', 'Cod', 'Grilled fish', 5.5);
Lunch.newDish(14, 'entree', 'Vegan concoction', 'Vegan stuff', 4.5);
Lunch.newDish(21, 'side', 'Fries', 'Homemade fries', 4.5);
Lunch.newDish(22, 'side', 'Veggies', 'Healthy veggies', 4.0);
Lunch.newDish(23, 'side', 'Salad', 'Healthy salad', 4.0);
Lunch.newDish(31, 'breakfast','Tuna Sandwich', 'Tuna and mayo', 6.0);
Lunch.newDish(32, 'breakfast','Cheese Sandwich', 'Emmental and butter', 6.5);
Lunch.newDish(33, 'breakfast','Porridge', 'Served hot', 5.5);
Lunch.newDish(41, 'custom','Do not add salt', '   ', 0.0);
Lunch.newDish(42, 'custom','Add cheese', 'Gouda', 1.0);
Lunch.newDish(43, 'custom','Add mayonese', 'homemade', 2.0);
Lunch.newDish(44, 'custom','Add tomato sauce', 'homemade', 2.0);
Lunch.newDish(45, 'custom','Caviar', 'A salted taste', 3.0);

if(currentMeal=='dinner'){
  Lunch.dishes.forEach((element) => {
    element.price = element.price*1.5;
  });
}

const offerText = (currentMeal !== 'breakfast') ? `We have an special offer. One main dish and two sides are offered at the price of ${standardPrice} €.` : '';

const wellcome = `Welcome to Bottega restaurant. We hope you will enjoy our wide range of hot and cold dishes. Currently we are serving the ${currentMeal} menu. ${offerText} Would you like to see the menu?`

const menuRendered = renderLunch(Lunch,currentMeal);
const customOptionsRendered = renderCustomOptions(Lunch);

if(currentMeal === 'lunch' || currentMeal === 'dinner'){
  serveLunch(wellcome, menuRendered, customOptionsRendered,Lunch, standardPrice);
  confirm('Thank you for trusting our restaurant. We look forward to serving you another day.');
} else if (currentMeal === 'breakfast') {
  serveBreakfast(wellcome, menuRendered, customOptionsRendered, Lunch);
  confirm('Thank you for trusting our restaurant. We look forward to serving you another day.');
} else {
  confirm("Dear customer, we are sorry to let you know that the kitchen is closed. Please come back at opening times. Press any key to continue.");
}
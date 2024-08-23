export class Dish {
    constructor(id, kind, name, description, price) {
      this.id = id;
      this.kind = kind;
      this.name = name;
      this.description = description;
      this.price = price;
    }
    
    renderDish() {
      return `${this.id} ${this.name}: ${this.description}. ${this.price} €`;
    }
  
  }
   
  export class Menu {
    constructor(){
      this.dishes = [];
    }
  
    newDish(id, kind, name, description, price){
      let d = new Dish(id, kind, name, description, price);
      this.dishes.push(d);
      return d;
    }
  
    getMainDishByCode(dishID){
      for(const dish of this.dishes){
        if(dish.id === parseInt(dishID)){
          if (dish.kind === 'entree') {
            return dish;
          }      
        }
      }
      return null;
    }
    getSideDishByCode(dishID){
      for(const dish of this.dishes){
        if(dish.id === parseInt(dishID)){
          if (dish.kind === 'side') {
            return dish;
          }      
        }
      }
      return null;
    } 
    
    getBreakfastDishByCode(dishID){
      for(const dish of this.dishes){
        if(dish.id === parseInt(dishID)){
          if (dish.kind === 'breakfast') {
            return dish;
          }      
        }
      }
      return null;
    }    
    getCustomByCode(dishID){
      for(const dish of this.dishes){
        if(dish.id === parseInt(dishID)){
          if (dish.kind === 'custom') {
            return dish;
          }      
        }
      }
      return null;
    }    
  };  
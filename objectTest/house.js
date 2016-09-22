function hello() {
  console.log("Test1");
  document.write("Test2");
}

function House(name, rooms, price, garage) {
  this.name = name;
  this.rooms = rooms;
  this.price = price;
  this.garage = garage;
}

function House_view() {
  with(this) {
    document.write(name + ' has ' + rooms + ' rooms, ' + (garage?'a':'no') + ' garage, and costs $' + price + ' <br>');
  }
}

function House_totalCost() {
  with(this) {
    this.view();
    document.write(name + ' has a total cost involved of $' + eval(price + survey + price * salesCommission) + ' <br>');
  }
}

House.prototype.view = House_view;
House.prototype.totalCost = House_totalCost;
House.prototype.salesCommission = 0.01;
House.prototype.survey = 1000;

var dog, happyDog, database, foodS, foodStock;

var dogImage, happyDogImage;

var addFood , feed;

var lastfed, fedtime, food;

function preload()
{
  dogImage = loadImage("images/dogImg.png")
  happyDogImage = loadImage("images/dogImg1.png")
  milkImage = loadImage("images/Milk.png")
}

function readStock(data){
  foodS = data.val()
}

function writeStock(food){
  if (food < 0) {
    food = 0
  }
  else {
    food -= 1
  } 
  database.ref("/").set({
    Food: food
  })
}

function setup() {
  createCanvas(1200, 500);
  database = firebase.database()
  dog = createSprite(600,200,30,30);
  dog.addImage(dogImage);
  dog.scale = 0.3;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(450,70)
  feed.mousePressed(removeFoods);

  addFood = createButton("Add Food");
  addFood.position(550,70)
  addFood.mousePressed(addFoods);

  food1 = new Food();


}


function draw() {  
background(46, 139, 87)


  drawSprites();
  //add styles here

  textSize(10)
  fill("white")
  stroke(2)
  textSize(15);
  fill("white");
  stroke(5);

if(food1.lastFed >=12){
  text("Last Fed: " + food1.lastFed % 12 + " PM", 150, 60);

}
else if(food1.lastFed === 0){
  text("Last Fed: 12 AM", 150, 60);

}

else {
  text("Last Fed: " + food1.lastFed + " AM", 150, 60);

}

 food1.display()

}

function addFoods(){
food1.foodStock++
food1.updateFoodStock(food1.foodStock)
}

function removeFoods(){
  dog.addImage(happyDogImage)
  food1.foodStock--
  food1.updateFoodStock(food1.foodStock)
  
  food1.updateFedTime();
  food1.fedTime();
}





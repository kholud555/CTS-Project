let Category = document.querySelector("#Category");
//select all radio input with name Level
let DifficultLevel = document.getElementsByName("Level");

//Save any change of category's value in session storage
Category.addEventListener("change", function () {
  sessionStorage.setItem("Category", `${Category.value}`);
});

//any change of radio input be saved in session storage
DifficultLevel.forEach((e) => {
  e.addEventListener("change", function () {
    sessionStorage.setItem("DifficultLevel", `${e.value}`);
    console.log(e.value);
  });
});

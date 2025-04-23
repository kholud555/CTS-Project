let Category = document.querySelector("#Category");
let DifficultLevel = document.getElementsByName("Level");
let startQuiz = document.querySelector(".StartBTNQuiz");

let categoryValue = null;
let difficultLevelValue = null;

Category.addEventListener("change", function () {
  categoryValue = Category.value;
});

DifficultLevel.forEach((e) => {
  e.addEventListener("change", function () {
    difficultLevelValue = e.value;
  });
});

startQuiz.addEventListener("click", function () {
  
  if (categoryValue == null || difficultLevelValue == null) {
    alert("Please select a category and a level");
  } else {
   let userPreferences  = {
      category: categoryValue,
      difficulty: difficultLevelValue,
    };
    sessionStorage.setItem("userPreferences", JSON.stringify(userPreferences));
    window.location.href = "question.html";
  }
});


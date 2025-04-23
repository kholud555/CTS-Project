// Sign- in Page
let UserName = document.querySelector("#UserName");
let Password = document.querySelector("#Password");
let LoginBTN = document.querySelector("#LoginBTN");
LoginBTN.addEventListener("click", function () {
  var Users = [];
  Users.push({ UserName: UserName.value, UserPassword: Password.value });
  console.log(Users);

  Users.forEach(function (e) {
    if (e.UserName == "kholud" && e.UserPassword == "123") {
      window.location.href = "../pages/index.html";
    } else {
      alert("Wrong User name or Password");
    }
  });
});

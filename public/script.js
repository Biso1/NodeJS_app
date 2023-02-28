// const { response } = require("express");

let con2 = document.querySelector(".con2");
async function create(text) {
  let con = document.createElement("div");
  con2.append(con);
  let p = document.createElement("p");
  p.innerText = text;
  con.append(p);
  let button = document.createElement("button");
  button.innerText = "Delete";
  con.append(button);
  //   localStorage.setItem("item", con2.innerHTML);
  await fetch("https://abbas.cyclic.app/api", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: con2.innerHTML }),
  });
  document.querySelector("body > div.con2").scrollTop = 9999999
}
let input = document.querySelector(".con1 input");
let add = document.querySelector(".con1 button");
add.addEventListener("click", function () {
  if (input.value != "") {
    create(input.value);
    input.value = "";
    let remove = document.querySelectorAll(".con2 div button");
    remove.forEach(function (e) {
      e.addEventListener("click", function () {
        e.parentElement.remove();
        fetch("https://abbas.cyclic.app/api", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: con2.innerHTML }),
        });
                localStorage.setItem("item", con2.innerHTML);
      });
    });
  }
});

input.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    add.click();
  }
});
let item = localStorage.getItem("item");
fetch("https://abbas.cyclic.app/content")
  .then((response) => response.json())
  .then((data) => {
  (con2.innerHTML = (data.message) || "")
  document.querySelector("body > div.con2").scrollTop = 9999999
  let remove = document.querySelectorAll(".con2 div button");
  remove.forEach(function (e) {
    e.addEventListener("click", function () {
      e.parentElement.remove();
        fetch("https://abbas.cyclic.app/api", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: con2.innerHTML }),
        });
    });
  });
  });


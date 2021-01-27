"use strict";
let inputElem = document.getElementsByClassName("tabs-title");
let i = 12;
for (let i = 0; i < inputElem.length; i++) {
  inputElem[i].addEventListener(
    "mousedown",
    function () {
      let activeTab = document.querySelector(".active");
      activeTab.classList.remove("active");
      this.classList.add("active");

      let visibleText = document.querySelectorAll(".visible");
      visibleText.forEach(function (el) {
        let active = document.querySelector(".visible");
        active.classList.remove("visible");
        active.classList.add("toggletab");
      });

      let chapter = this.classList[1].charAt(3);
      let toggleText = document.querySelector("#services_list").children[
        chapter - 1
      ];
      toggleText.className = "visible";
    },
    false
  );
}
$(function () {
  $(".amazing_tabs li").click(function () {
    var get_id = this.id;
    var get_current = $(".gallery ." + get_id);
    $(".gallery_items").not(get_current).hide();
    get_current.show();
    let activeTab = document.querySelector(".active2");
    activeTab.classList.remove("active2");
    this.classList.add("active2");
  });

  $("#all").click(function () {
    $(".gallery_items").show();
  });
});

let element = document.getElementsByClassName("gallery_items");

// раз уж мы добавляем блок, я подумал что глупо будет добавлять иннерхтмл уже готовый кусок, а надо сделать по-хорошему. Но по-хорошему получилось как-то вот так глупо)
function loadMore(i) {
  if (i == 12) {
    for (i; i < 24; i++) {
      make(i);
    }
    return;
  }

  if (i == 24) {
    for (i; i < 36; i++) {
      make(i);
    }
    load.remove();
    return;
  }

  return;

  function make() {
    let current = document.getElementsByClassName("active2")[0];

    let li = document.getElementById("gallery_list");
    li.append(document.createElement("li"));
    let insideLi = li.getElementsByTagName("li")[i];
    insideLi.classList.add("gallery_items");
    // "имитация" рандома. можно было через одд/ивен сделать или что-то более посложнее, я думаю это не важно для данного примера. просто раскидвал разные значения

    if (current.id !== "all") {
      insideLi.classList.add(current.id);
    }
    if (current.id == "all") {
      if (
        i == "12" ||
        i == "14" ||
        i == "18" ||
        i == "25" ||
        i == "30" ||
        i == "31"
      ) {
        insideLi.classList.add("wordpress");
      }
      if (
        i == "13" ||
        i == "17" ||
        i == "20" ||
        i == "26" ||
        i == "32" ||
        i == "33"
      ) {
        insideLi.classList.add("graphic-design");
      }
      if (
        i == "15" ||
        i == "16" ||
        i == "24" ||
        i == "27" ||
        i == "29" ||
        i == "36"
      ) {
        insideLi.classList.add("web-design");
      }
      if (
        i == "19" ||
        i == "21" ||
        i == "22" ||
        i == "23" ||
        i == "28" ||
        i == "34" ||
        i == "35"
      ) {
        insideLi.classList.add("landing-pages");
      }
    }
    /// В данный момент работа такая: если мы в олл, то оно добавляет 12 "рандомных" картинок. если мы в категории, то оно добавляет все 12 картинок в эту категорию.
    /// Соответственно можно добавить 12+12 разных, либо 12 и еще 12 в какую-то из категорий фильтра.

    insideLi.append(document.createElement("img"));
    insideLi.append(document.createElement("div"));
    let insideDiv = insideLi.getElementsByTagName("div")[0];
    insideDiv.classList.add("hidetext");
    insideDiv.append(document.createElement("div"));
    let insideDiv2 = insideLi.getElementsByTagName("div")[1];
    insideDiv2.append(document.createElement("a"));
    insideDiv2.append(document.createElement("a"));
    let insideA = insideDiv.getElementsByTagName("a")[0];
    let insideA2 = insideDiv.getElementsByTagName("a")[1];
    insideA.append(document.createElement("img"));
    insideA.setAttribute("href", "#!");
    let img = insideLi.getElementsByTagName("img")[0];
    img.setAttribute("src", "img/gallery/" + i + ".jpg");
    img.setAttribute("width", "290");
    img.classList.add("gallery_img");
    let img1 = insideLi.getElementsByTagName("img")[1];
    img1.setAttribute("src", "img/el1.png");
    img1.classList.add("work_link1");
    insideA2.append(document.createElement("img"));
    let img2 = insideLi.getElementsByTagName("img")[2];
    img2.setAttribute("src", "img/el3.png");
    img2.classList.add("work_link2");
    insideDiv.append(document.createElement("p"));
    let p = insideLi.getElementsByTagName("p")[0];
    p.innerHTML = "Creative Design";
    insideDiv.append(document.createElement("span"));
    let span = insideLi.getElementsByTagName("span")[0];
    span.innerHTML = "Web Design";
    let load = document.getElementById("load");
  }
}

//Masonry unfinished
$(document).ready(function () {
  $("#container").masonry({
    columnWidth: 185,
    gutter: 10,
    itemSelector: ".item_masonry",
    isResizable: true,
    isAnimated: true,
    animationOptions: {
      queue: false,
      duration: 500,
    },
  });
});

///подгрузка в масонри не работает, не вышло сделать. оно добавляет в список, но не после, а под гридом.
// function loadMore2(i) {
//   for (let i = 14; i < 27; i++) {
//     let s = document.getElementById("containerx");
//     s.append(document.createElement("div"));
//     let insideDiv = s.getElementsByTagName("div")[i];
//     insideDiv.classList.add("itemx");
//     insideDiv.append(document.createElement("img"));
//     let img = insideDiv.getElementsByTagName("img")[0];
//     img.setAttribute("src", "img/gallery/" + i + "x.png");
//     img.setAttribute("width", "378");
//     console.log(s);
//   }
// }

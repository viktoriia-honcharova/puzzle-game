let check = false;
let seconds;
let reset1 = $(".wr-1").html();
let reset2 = $(".wr-2").html();
let currentBox;

function showModal() {
  let modalDiv = $(".modal");
  $(".modal-container").css({
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 3,
  });
  modalDiv.css("top", (window.innerHeight - modalDiv.height()) / 2);
  modalDiv.css("left", (window.innerWidth - modalDiv.width()) / 2);
  modalDiv.show();
}

$("#start").on("click", function () {
  $("#new").prop("disabled", false);
  $("#start").prop("disabled", true);
  $("#check").prop("disabled", false);

  $(".box").draggable({
    revert: true,
    revertDuration: 0,
    start: function (event) {
      currentBox = event.target;
    },
  });

  $(".drop").droppable({
    drop: function (event) {
      event.preventDefault();
      $(event.target).css("background", `url("./pazzle.PNG")`);
      $(event.target).css(
        "backgroundPosition",
        `${$(currentBox).css("background-position")}`
      );
      $(currentBox).css("background", "none");
      $(event.target).attr("id", `${$(currentBox).attr("id")}_`);
      console.log($(event.target).attr("id"));
    },
  });

  seconds = 60;
  function tick() {
    let counter = $("#timer-value");
    seconds--;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    counter.text(`00:${seconds}`);
    $("#modal-time").text(`00:${seconds}`);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      showModal();
      $(".modal-text").text("It`s a pity, but you lost");
      $("#check-res").hide();
      $("#modal-time").hide();
      $("#check").prop("disabled", true);
    }
  }
  tick();
});

$("#new").on("click", function () {
  $(".wr-1").html(reset1);
  $(".wr-2").html(reset2);
  $("#start").prop("disabled", false);
  $("#new").prop("disabled", true);
  let parent = $(".wr-1");
  let divs = parent.children();
  while (divs.length) {
    parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
  }
});

$("#check").on("click", function () {
  $(".modal-text").text("You still have time, you sure?");
  $("#check-res").show();
  $("#modal-time").show();
  showModal();
});

$("#close").on("click", function () {
  $(".modal").hide();
  $(".modal-container").css({
    backgroundColor: "#fff",
    zIndex: -1,
  });
});

$("#check-res").on("click", function () {
  let idNameArray = [
    "box-1_",
    "box-2_",
    "box-3_",
    "box-4_",
    "box-5_",
    "box-6_",
    "box-7_",
    "box-8_",
    "box-9_",
    "box-10_",
    "box-11_",
    "box-12_",
    "box-13_",
    "box-14_",
    "box-15_",
    "box-16_",
  ];

  let arrayToCompare = [];
  let parent = $(".wr-2");
  let divs = parent.children();

  for (let i = 0; i < divs.length; i++) {
    arrayToCompare.push(divs[i].id);
  }
  console.log(arrayToCompare);

  for (let i = 0; i < idNameArray.length; i++) {
    if (arrayToCompare[i] !== idNameArray[i]) {
      $(".modal-text").text("It`s a pity, but you lost");
      $("#check-res").hide();
      $("#modal-time").hide();
      seconds = 1;
      break;
    } else {
      $(".modal-text").text("Woohoo, well done, you did it!");
      $("#check-res").hide();
      $("#modal-time").hide();
    }
  }

  console.log(check);
});

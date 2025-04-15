// ^ HTML elements |
//* C R E A T E  |
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var siteImage = document.getElementById("siteImage");

var saveMark = document.querySelector(".form-holder > button");

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* R E A D |
var cardsContainer = document.querySelector(".cards-container");

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* U P D A T E |
var updateButton = document.querySelector(".form-holder button:last-child");

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* S E A R C H |
var searchInput = document.querySelector("input[type='search']");

// ^ _________________________________________________________________
// ^ Variables |
var bookMarkList = JSON.parse(localStorage.getItem("BookMark")) || [];
displayAllCards();

// ~ ANOTHER SOLUTION BY IF STATEMENT_
// if(localStorage.getItem("BookMark") !== null) {
//     var bookMarkList = JSON.parse(localStorage.getItem("BookMark"));
//    displayAllCards()
// }else{
//     var bookMarkList =[];
// }
// ~ ANOTHER SOLUTION BY IF STATEMENT_

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var updateIndex;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* R E G E X |
var siteNameRegex = /^([A-Z]{3,8}|[a-z]{3,8})$/;
var siteUrlRegex = /^(https?:\/\/|www\.)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\/\S*)?$/;
// ^  _________________________________________________________________
// ^ Functions |
// * CRUDS Operations | C R E A T E
function addBookMark() {
  if (validate(siteNameRegex, siteName) && validate(siteUrlRegex, siteURL)) {
    var imageName = "";
    if (siteImage.files.length > 0) {
      imageName = siteImage.files[0].name;
    }

    var allowedImageNames = [
      "test-1.avif",
      "test-2.avif",
      "test-3.avif",
      "test-4.avif",
    ];
    var defaultImage = `https://images.unsplash.com/photo-1516108317508-6788f6a160e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;

    var imagePath = "";
    if (allowedImageNames.includes(imageName)) {
      imagePath = `IMGS/IMGS-TEST/${imageName}`;
    } else {
      imagePath = defaultImage;
    }

    var bookMarkCard = {
      name: siteName.value,
      url: siteURL.value,
      image: imagePath,
    };

    bookMarkList.push(bookMarkCard);
    localStorage.setItem("BookMark", JSON.stringify(bookMarkList));
    displayBookMark(bookMarkList.length - 1);
    clearInputs();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      width: "250px",
      customClass: {
        confirmButton: "alert-button",
      },
    });
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* CRUDS Operations | R E A D
function displayBookMark(index) {
  var markCards = `<div class="col-sm-12 col-md-6 col-lg-3">
              <div class="mark-cards">
                <div class="img-holder">
                  <img src="${bookMarkList[index].image}" alt="" />

                  <div class="layer">
                    <i class="fa-solid fa-anchor"></i>

                    <div class="text-center mt-2">
                      <h3>${bookMarkList[index].name}</h3>
                      <a href="${bookMarkList[index].url}" target="_blank"> visit site</a>
                    </div>

                    <div>
                      <button onClick="resetValues(${index})">update</button>
                      <button onClick = "deleteCard(${index})">delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

  cardsContainer.innerHTML += markCards;
}

function displayAllCards() {
  for (i = 0; i < bookMarkList.length; i++) {
    displayBookMark(i);
  }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// * C L E A R function
function clearInputs() {
  siteName.value = "";
  siteURL.value = "";
  siteImage.value = null;

  siteName.classList.remove("is-valid");
  siteURL.classList.remove("is-valid");
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* CRUDS Operations | U P D A T E
function resetValues(i) {
  siteName.value = bookMarkList[i].name;
  siteURL.value = bookMarkList[i].url;

  saveMark.classList.add("d-none");
  updateButton.classList.remove("d-none");

  updateIndex = i;
}

function updateCard() {
  bookMarkList[updateIndex].name = siteName.value;
  bookMarkList[updateIndex].url = siteURL.value;

  localStorage.setItem("BookMark", JSON.stringify(bookMarkList));
  cardsContainer.innerHTML = "";
  displayAllCards();
  clearInputs();

  saveMark.classList.remove("d-none");
  updateButton.classList.add("d-none");
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* CRUDS Operations | D E L E T E
function deleteCard(i) {
  bookMarkList.splice(i, 1);
  localStorage.setItem("BookMark", JSON.stringify(bookMarkList));
  cardsContainer.innerHTML = "";
  displayAllCards();
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* CRUDS Operations | S E A R C H
function searchMark() {
  cardsContainer.innerHTML = "";
  for (i = 0; i < bookMarkList.length; i++) {
    if (
      bookMarkList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      displayBookMark(i);
    }
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//* V A L I D A T I O N function |
function validate(regexName, inputName) {
  if (regexName.test(inputName.value)) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
    inputName.nextElementSibling.classList.add("d-none");
    return true;
  }

  inputName.classList.remove("is-valid");
  inputName.classList.add("is-invalid");
  inputName.nextElementSibling.classList.remove("d-none");
  return false;
}
// ^  __________________________________________________________________
// ^ Events |
//* C R E A T E EVAENT |
siteName.addEventListener("input", function () {
  validate(siteNameRegex, siteName);
});

siteURL.addEventListener("input", function () {
  validate(siteUrlRegex, siteURL);
});
searchInput.addEventListener("input", searchMark);
saveMark.addEventListener("click", addBookMark);
updateButton.addEventListener("click", updateCard);

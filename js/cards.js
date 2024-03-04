// let choseCard = false;
// let totalBox = document.querySelector("#total");
//expected return of 70


let winnings = 0;
let winningTable = [0, 0, 40, 50, 50, 80, 80, 125, 125, 200];
let otherTable = [0, 125, 40, 50, 80, 80, 1000, 125, 125, 200];
let choseCard = false;
let chosenCard;

function activateCards() {
    let cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {

        card.addEventListener("click", () => {

            if (!choseCard) {
                choseCard = true;
                chosenCard = card;
                profit -= 100;
                updateTotal();
                card.classList.toggle("chosen-card");
                card.classList.toggle("flip");
                var button = document.getElementById("cards-reset");
                button.disabled = true;

                card.addEventListener(
                    "transitionend",
                    function transitionEndHandler(event) {
                        card.classList.toggle("flip");
                        pickCard(card, winningTable, true);
                        let popup = document.getElementById("money-popup");
                        popup.classList.toggle("card-content-back");

                        //flips the remaining cards
                        cards.forEach((card) => {
                            if (card !== chosenCard) {
                                card.classList.toggle("flip");
                                card.addEventListener(
                                    "transitionend",
                                    function transitionEndHandler(event) {
                                        card.classList.toggle("flip");
                                        pickCard(card, otherTable, false);
                                        let popup = document.getElementById("money-popup");
                                        popup.classList.toggle("card-content-back");
                                    }
                                );
                            }
                        });
                        button.disabled = false;
                    }
                );
                setTimeout(addDataPoint, 5000);

            }


        });
    });


    function pickCard(content, table, isChosenCard) {
        winnings = table[Math.floor(Math.random() * table.length)];

        if (isChosenCard) {
            profit += winnings;
            updateTotal();
            content.innerHTML = '<div id="money-popup">' + "$" + winnings + "</div>";
        } else {
            content.innerHTML = '<div class="other-cards" id="money-popup">' + "$" + winnings + "</div>";
        }
    }

    let reset = document.getElementById('cards-reset');
    reset.addEventListener('click', resetCards);

    initButtonHover()
}

function resetCards() {
    let content = document.querySelector('.card-container-content');
    content.innerHTML = `<div class="card-container">
          <div class="card-content-front"></div>
      </div>
      <div class="card-container">
          <div class="card-content-front"></div>
      </div>
      <div class="card-container">
          <div class="card-content-front"></div>
      </div>`;
    choseCard = false;
    activateCards();
}

//
// document.addEventListener('click', function(event) {
//     if (event.target.classList.contains('card-container')) {
//         cardClickHandler.call(event.target);
//     }
// });
function activateSlots() {
    (function () {
        const items = ["🍒", "🎰", "🔔"];
        const doors = document.querySelectorAll(".door");

        document.querySelector("#spinner").addEventListener("click", spin);
        document.querySelector("#reseter").addEventListener("click", init);

        //disablebutton
        function disableButton() {
            var button = document.getElementById("spinner");
            button.disabled = true;
        }

        function enableReset() {
            var button = document.getElementById("reseter");
            button.disabled = false;
        }

        function disableReset() {
            var button = document.getElementById("reseter");
            button.disabled = true;
        }

        function init(firstInit = true, groups = 1, duration = 0.5) {
            for (const door of doors) {
                if (firstInit) {
                    door.dataset.spinned = "0";
                } else if (door.dataset.spinned === "1") {
                    return;
                }

                const boxes = door.querySelector(".boxes");
                const boxesClone = boxes.cloneNode(false);
                const pool = ["❓"];

                if (!firstInit) {
                    const arr = [];
                    for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
                        arr.push(...items);
                    }
                    pool.push(...shuffle(arr));

                    boxesClone.addEventListener(
                        "transitionstart",
                        function () {
                            door.dataset.spinned = "1";
                            this.querySelectorAll(".box").forEach((box) => {
                                box.style.filter = "blur(1px)";
                            });
                        },
                        {once: true}
                    );

                    boxesClone.addEventListener(
                        "transitionend",
                        function () {
                            this.querySelectorAll(".box").forEach((box, index) => {
                                box.style.filter = "blur(0)";
                                if (index > 0) this.removeChild(box);
                            });
                        },
                        {once: true}
                    );
                }

                for (let i = pool.length - 1; i >= 0; i--) {
                    const box = document.createElement("div");
                    box.classList.add("box");
                    box.style.width = door.clientWidth + "px";
                    box.style.height = door.clientHeight + "px";
                    box.textContent = pool[i];
                    boxesClone.appendChild(box);
                }
                boxesClone.style.transitionDuration = `${
                    duration > 0 ? duration : 0.5
                }s`;
                boxesClone.style.transform = `translateY(-${
                    door.clientHeight * (pool.length - 1)
                }px)`;
                door.replaceChild(boxesClone, boxes);
            }
        }

        function checkWin(emojis) {
            return emojis.every((emoji) => emoji === emojis[0]);
        }

        async function spin() {
            disableReset()
            disableButton();
            profit -= 100;
            updateTotal();
            init(false, 1, 2);
            let displayedEmojis = [];

            for (const door of doors) {
                const boxes = door.querySelector(".boxes");
                const duration = parseInt(boxes.style.transitionDuration);
                boxes.style.transform = "translateY(0)";
                await new Promise((resolve) => setTimeout(resolve, duration * 500));
                const displayedEmoji = door.querySelector(".box").textContent;
                displayedEmojis.push(displayedEmoji);
            }

            if (checkWin(displayedEmojis)) {
                const delay = 2000;
                profit += 666;
                updateTotal();
                setTimeout(() => {
                    Swal.fire({
                        title: "🎉 WIN! 🎉",
                        text: "+$666",
                        confirmButtonText: "Cool",
                    });
                }, delay);
            } else {
                console.log("Try again!");
            }
            setTimeout(addDataPoint, 1000);
            setTimeout(enableReset, 1000);
        }

        function shuffle([...arr]) {
            let m = arr.length;
            while (m) {
                const i = Math.floor(Math.random() * m--);
                [arr[m], arr[i]] = [arr[i], arr[m]];
            }
            return arr;
        }

        init();
    })();
    let spinButtonText = document.querySelector('.spinner-text');
    spinButtonText.addEventListener('mouseenter', function () {
        spinButtonText.innerHTML = "$100";
    });

    spinButtonText.addEventListener('mouseleave', function () {
        spinButtonText.innerHTML = "Spin";
    });

    initButtonHover()
}

let initButtonHover = () => {
    let buttons = document.querySelectorAll(".button")
    buttons.forEach((b) => {
        b.addEventListener('mouseenter', function () {
            b.style.backgroundColor = "#c8c8c8";
        });

        b.addEventListener('mouseleave', function () {
            b.style.backgroundColor = "#e5e4e2";
        });
    })
}
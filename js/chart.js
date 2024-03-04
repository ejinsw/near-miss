const ctx = document.getElementById("myChart");
const totalBox = document.querySelector("#total");
const profitBox = document.querySelector("#profit");
var total = 1000;
var profit = 0;

function updateTotal() {
  totalBox.innerHTML = "$" + (total + profit);
  profitBox.innerHTML = "$" + profit;

  if (total + profit <= 0) {
    Swal.fire({
      title: "Bankrupt!",
      text: "Your Net Worth Fell Below $0",
      confirmButtonText: "Sell a kidney",
    }).then((result) => {
      if (result.isConfirmed) {
        // Use window.location.reload() to refresh the page
        window.location.reload();
      }
    });
  }
}

updateTotal();

var chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [0],
    datasets: [
      {
        label: "Expected Yield from CD's",
        data: [1000],
        borderColor: "rgb(0,161,63)",
        backgroundColor: "rgb(255, 255, 255)",
      },
      {
        label: "Net Worth",
        data: [1000],
        borderColor: "rgb(184,27,27)",
        backgroundColor: "rgb(255, 255, 255)",
      },
      {
        label: "Bitcoin Risk Equivalence (β: 0.28)",
        data: [1000],
        borderColor: "rgb(218,157,0)",
        backgroundColor: "rgb(255, 255, 255)",
      },
    ],
  },
  options: {
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});

chart.canvas.parentNode.style.height = "45vh";
chart.canvas.parentNode.style.height = "45vh";
chart.canvas.parentNode.style.margin = "0";
chart.canvas.parentNode.style.padding = "0";

let monthText = document.querySelector(".month");
let month = 1;

let cd = 1000;
let interestRate = 0.05 + Math.random() * 0.02;

let meanText = document.querySelector(".mean-value");

let deviationText = document.querySelector(".deviation-value");

function addDataPoint() {
  //labels
  monthText.innerHTML = month;
  chart.data.labels.push(month++);

  //expected yield from cd's
  cd = 1000 * Math.pow(1 + interestRate / 12, month);
  console.log(cd);
  chart.data.datasets[0].data.push(cd);

  //networth
  chart.data.datasets[1].data.push(total + profit);

  //value
  let sum = 0;
  let mean = 0;
  chart.data.datasets[1].data.forEach((dataPoint) => {
    sum += dataPoint;
  });
  mean = sum / month;
  meanText.innerHTML = "$" + Math.round(mean);

  let deviation =
    chart.data.datasets[1].data[chart.data.datasets[1].data.length - 1] /
      chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1] -
    1;
  deviationText.innerHTML =
    (Math.round(deviation * 10000) / 100).toFixed(2) + "%";

  let bitcoinValue = 1000;
  bitcoinValue += (bitcoinValue * (Math.random() * 50 - 25)) / 100;
  chart.data.datasets[2].data.push(bitcoinValue);

  chart.update();
}

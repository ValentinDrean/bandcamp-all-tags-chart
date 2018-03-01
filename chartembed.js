let label = [];
let dataMine = [];

if (window.addEventListener) {
  window.addEventListener("load", init, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", init);
} else {
  document.addEventListener("load", init, false);
}

function init()
{
  GetChartData();
}

var ctx = document.getElementById("bcRadar").getContext("2d");

function GetChartData() {
  console.log("Creating Chartjs");

  window.bcRadar = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [],
      datasets: [{
        label: "LocalTestUser",
        data: [],
        backgroundColor: 'rgba(0,119,204,0.2)',
        borderColor: 'rgba(0,119,204, 0.5)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(0, 0, 0, 0.5)'
      }]
    },
    options:
    {
      title: {
        display: true,
        position: "top",
        text: "Radar test",
        fontSize: 14,
        fontColor: "#111"
      },
      legend: {
        display: true,
        position: "bottom"
      },
      scale: {
        pointLabels: {
          fontSize: 11
        }
      }
    }
  });

  // Ajax data recover from service
  var getData = $.ajax({
    type: 'GET',
    url: 'data.json', // http://jack.tf:8123/data.json
    async: true,
    timeout: 1000,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  });

  getData.done(function(bcData)
  {
    console.log("Getting json from user");
    console.log(bcData.labels);
    if (bcData != null)
    {
      for (var i = 0; i < bcData.labels.length; i++)
      {
        // pushing labels (music tags)
        bcRadar.data.labels.push(bcData.labels[i]);
        // pushing datasets (tag intensity)
        dataMine.push(bcData.datasets[0].data[i]);
        bcRadar.data.datasets[0].data = dataMine;
      }
      console.log(dataMine);
    }
    else
    {
      alert("No data in this time dimension !");
    }
    bcRadar.update();
  });

  getData.fail(function(bcData)
  {
    console.log(bcData);
    alert("No data in this time dimension !");
  })
};

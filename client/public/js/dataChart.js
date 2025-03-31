const dataSeriesOptions = {
  // add data series via arrays, learn more here: https://apexcharts.com/docs/series/
  series: [
    {
      name: "Developer Edition",
      data: [
        1500, 1418, 1456, 1526, 1356, 1256, 1100, 1450, 1660, 1777, 1560, 1540,
        1566,
      ],
      color: "#1A56DB",
    },
    {
      name: "Designer Edition",
      data: [
        643, 413, 765, 412, 1423, 1731, 643, 413, 765, 412, 1423, 1731, 1444,
      ],
      color: "#7E3BF2",
    },
  ],
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "area",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  fill: {
    type: "gradient",
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: "#1C64F2",
      gradientToColors: ["#1C64F2"],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 6,
  },
  grid: {
    show: false,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: 0,
    },
  },
  xaxis: {
    categories: [
      "01 February",
      "02 February",
      "03 February",
      "04 February",
      "05 February",
      "06 February",
      "08 February",
      "09 February",
      "10 February",
      "11 February",
      "12 February",
      "13 February",
    ],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      formatter: function (value) {
        return "$" + value;
      },
    },
  },
};

if (
  document.getElementById("data-series-chart") &&
  typeof ApexCharts !== "undefined"
) {
  const dataSeriesChart = new ApexCharts(
    document.getElementById("data-series-chart"),
    dataSeriesOptions
  );
  dataSeriesChart.render();
}

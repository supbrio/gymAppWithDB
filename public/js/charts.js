// export )

export const createChart = () => {
  const chart = Highcharts.chart("chart", {
    chart: { type: "line" },
    title: { text: "" },
    xAxis: { title: { text: "Date" } },
    yAxis: { title: { text: "Exercise" } },
    series: [
      {
        exercise: "Squat",
        data: [1, 2, 3],
      },
    ],
  });
  return chart;
};

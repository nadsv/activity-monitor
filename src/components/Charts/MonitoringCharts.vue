<template>
  <div id="chart">
    <apexchart
      type="line"
      height="450"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      series: [
        {
          name: "Reading",
          data: [
            {
              x: "2022/05/03",
              y: 54,
            },
            {
              x: "2022/05/04",
              y: 18,
            },
          ],
        },
        {
          name: "Coding",
          data: [
            {
              x: "2022/05/01",
              y: 34,
            },
            {
              x: "2022/05/02",
              y: 45,
            },
            {
              x: "2022/06/02",
              y: 45,
            },
          ],
        },
      ],
      chartOptions: {
        chart: {
          height: 450,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#F2C037", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Average High & Low Temperature",
          align: "left",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "Month",
          },
        },
        yaxis: {
          title: {
            text: "Temperature",
          },
          min: 15,
          max: 60,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -15,
          offsetX: -5,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>

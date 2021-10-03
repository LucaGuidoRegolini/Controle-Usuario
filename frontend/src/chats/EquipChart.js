import { Bar } from "vue-chartjs";

export default {
  extends: Bar,

  props: {
    datas: {
      require: true,
    },
  },

  data() {
    return {
      data: {
        labels: ["Total", "Online", "Offline"],
        datasets: [
          {
            label: "equipamentos",
            data: [this.datas.Total, this.datas.Online, this.datas.Offline],
            backgroundColor: ["#0b0bff", "#65ceff", "#ff0000"],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },

  mounted() {
    this.renderChart(this.data, this.options);
  },
};

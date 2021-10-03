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
        labels: ["Usuarios"],
        datasets: [
          {
            label: "usuarios",
            data: [this.datas],
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

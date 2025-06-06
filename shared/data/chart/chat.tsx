// Need to Import {Importent}
import Chart from 'chart.js/auto';
import { ChartData, ChartDataset, Chart as ChartJS, ChartOptions, ChartType, registerables } from "chart.js";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

// Linechart

interface LineChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins: {
    legend: {
      position: "left" | "top" | "right" | "bottom" | "center" | "chartArea" | {
        [scaleId: string]: number;
      } | undefined;
    };
    title: {
      display: boolean;
      text: string;
    };
  };
}

export const Linechart: LineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

export const linechartdata = {
  labels: ["B.E", "Ç.A",
    "Ç.", "C.A", "C", "Ş", "B."],
  datasets: [
    {
      label: "88A üzrə",
      data: [20, 40, 210, 90, 100, 10, 40],
      borderWidth: 2,
      backgroundColor: "#6D6AFF",
      borderColor: "#6D6AFF",
      pointBackgroundColor: "#ffffff",
      pointRadius: 2,
      fill: true,
      tension: 0.4,
    },
    {
        label: "Bütün xətlər üzrə",
        data: [10, 420, 300, 354, 580, 320, 480],
        borderWidth: 2,
        backgroundColor: "#F6941C",
        borderColor: "#F6941C",
        pointBackgroundColor: "#ffffff",
        pointRadius: 2,
        fill: true,
        tension: 0.4,
      },
  ],
};

// Bar-chart 1
export const Barchart1 : LineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};
export const barchart1data = {
  labels: ["06:00 - 09:00", "09:00 - 12:00", "12:00 - 15:00", "15:00 - 18:00"],
  datasets: [
    {
      // label: "My First Dataset",
      data: [200, 450, 290, 367],
      // borderWidth: 2,
      backgroundColor: "#6D6AFF",
      borderColor: "#6D6AFF",
      borderWidth: 2.0,
      pointBackgroundColor: "#ffffff",
      label: "Şikayət sayı",
    }
  ],
};

export const barchartProblemdata = {
  labels: ["Sürücünün davranışı", "Avtobusun təmizliyi", "Dayanacağın əlçatanlığı"],
  datasets: [
    {
      // label: "My First Dataset",
      data: [232, 87, 167],
      // borderWidth: 2,
      backgroundColor: ["#32356A", '#6D6AFF', '#F6941C'],
      borderColor: ["#32356A", '#6D6AFF', '#F6941C'],
      borderWidth: 2.0,
      pointBackgroundColor: "#ffffff",
      label: "",
    }
  ],
};
// Bar-chart 2

export const Barchart2 : LineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const barchart2: ChartData<'bar', number[], string>  = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Data1',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: '#6259ca',
      borderWidth: 0,
      backgroundColor: '#6259ca',
    },
    {
      label: 'Data2',
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: '#53caed',
      borderWidth: 0,
      backgroundColor: '#53caed',
    },
  ],
};

const barchart2options: ChartOptions<'bar'> | any = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: true,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 150,
          fontColor: '#77778e',
        },
        gridLines: {
          color: 'rgba(119, 119, 142, 0.2)',
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          display: true,
          fontColor: '#77778e',
        },
        gridLines: {
          display: false,
          color: 'rgba(119, 119, 142, 0.2)',
        },
      },
    ],
  },
  plugins: {
    labels: {
      fontColor: '#77778e',
    },
  },
};

export const barchart2data : ChartData<'bar', number[], string> & { options?: ChartOptions<'bar'> } = {
  ...barchart2,
  options: barchart2options,
};
// Area-chart

export const Areachart : LineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

interface CustomChartData<TType extends ChartType = ChartType, TData extends unknown[] = unknown[], TLabel = string> extends ChartData<TType, TData, TLabel> {
  options?: ChartOptions<TType>;
}

export const areachart: CustomChartData<'line', number[], string> | any = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Data 1",
      borderColor: "rgba(235, 111, 51, 0.9)",
      borderWidth: 1,
      backgroundColor: "rgba(235, 111, 51, 0.7)",
      data: [16, 32, 18, 26, 42, 33, 44],
      fill: true,
      tension: 0.4,
    },
    {
      label: "Data 2",
      backgroundColor: "rgba(113, 76, 190, 0.5)",
      borderColor: "rgba(113, 76, 190, 0.9)",
      data: [22, 44, 67, 43, 76, 45, 12],
      fill: true,
      tension: 0.4,
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        ticks: {
          color: "#77778e",
        },
        grid: {
          color: "rgba(119, 119, 142, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "#77778e",
          beginAtZero: true, // Move beginAtZero option here
        },
        grid: {
          color: "rgba(119, 119, 142, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#77778e",
        },
      },
    },
  },
};

// DONUT CHART

export const dchart = {
  datasets: [
    {
      data: [20, 20, 30, 5, 25],
      backgroundColor: ["#6259ca", "#53caed", "#01b8ff", "#f16d75", "#29ccbb"],
    },
  ],
  hoverOffset: 4,
};

//  piechart
export const piechart = {
    labels: [
        'Ceyhun',
        'Farid',
        'Babek'
      ],
      datasets: [{
        label: 'Şikayət sayı',
        data: [300, 50, 100],
        backgroundColor: [
          '#32356A',
          '#6D6AFF',
          '#F6941C'
        ],
        hoverOffset: 4
      }]
};

//  piechart
export const piechart2 = {
    labels: [
        '88 üzrə',
        '88A üzrə'
      ],
      datasets: [{
        label: 'Anket sayı',
        data: [40, 50],
        backgroundColor: [
          '#6D6AFF',
          '#F6941C'
        ],
        hoverOffset: 4
      }]
};

interface RadarchartData {
  labels: (string | string[])[];
  datasets: ChartDataset<"radar", number[]>[];
  options: {
    responsive: boolean;
    maintainAspectRatio: boolean;
    legend: any; // Update the type for legend options if needed
    scale: any; // Update the type for scale options if needed
  };
}

// Radarchart
export const Radarchart1: ChartData<"radar", number[], string | string[]> | any = {
  labels: [
    ["Eating", "Dinner"],
    ["Drinking", "Water"],
    "Sleeping",
    ["Designing", "Graphics"],
    "Coding",
    "Cycling",
    "Running",
  ],

  datasets: [
    {
      label: "Data1",
      data: [65, 59, 66, 45, 56, 55, 40],
      borderColor: "rgba(113, 76, 190, 0.9)",
      borderWidth: "1",
      backgroundColor: "rgba(113, 76, 190, 0.5)",
    },
    {
      label: "Data2",
      data: [28, 12, 40, 19, 63, 27, 87],
      borderColor: "rgba(235, 111, 51,0.8)",
      borderWidth: "1",
      backgroundColor: "rgba(235, 111, 51,0.4)",
    },
  ],
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scale: {
      angleLines: { color: "#77778e" },
      gridLines: {
       show:true
      },
      ticks: {
        beginAtZero: true,
      },
      pointLabels: {
        fontColor: "#77778e",
      },
    },
  },
};
// polarchart
export const Polarchart1 = {
  labels: ["Data1", "Data2", "Data3", "Data4"],
  datasets: [
    {
      data: [18, 15, 9, 6, 19],
      backgroundColor: ["#6259ca", "#53caed", "#01b8ff", "#f16d75", "#29ccbb"],
      hoverBackgroundColor: [
        "#6259ca",
        "#53caed",
        "#01b8ff",
        "#f16d75",
        "#29ccbb",
      ],
      borderColor: "transparent",
    },
  ],
  options: {
    responsive: true,
    scale: {
      gridLines: {
        color: "rgba(119, 119, 142, 0.2)",
      },
    },
    // responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "#77778e",
      },
    },
  },
};

//  sparkline charts

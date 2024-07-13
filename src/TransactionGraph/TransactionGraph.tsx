
import { Chart, CategoryScale, Filler, PointElement, LineElement, Title, Tooltip, Legend, LinearScale } from "chart.js";
import { Line } from "react-chartjs-2";
import HandelDataContext from "../Context/HandelDataContext";
import { useContext } from "react";
import { ITransactions } from "../interface";

type Props = {};

Chart.register(Filler, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TransactionGraph({ }: Props) {
    const { getTransacitons } = useContext(HandelDataContext);

    const amounts = getTransacitons().map((transaction: ITransactions) => transaction.amount);
    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                padding: 10
            }
        },
        layout: {
            padding: {
                right: 20,
                left: 20,
                top: 20,
                bottom: 20
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#FFFFFF', // Change tick labels color to white
                    font: {
                        size: 14 // Change tick size here
                    },
                    maxTicksLimit: 7,
                    maxRotation: 0,
                    minRotation: 0,
                    align: 'center' as 'center' | 'start' | 'end' | undefined, // Explicitly specify valid type
                },
                grid: {
                    display: true, // Show grid lines
                    color: 'rgba(255, 255, 255, 0.2)', // Change grid line color to semi-transparent white
                    drawBorder: true,
                },
                border: {
                    color: '#FFFFFF', // Change the axis line color to white
                    width: .5, // Set the axis line width
                }
            },
            y: {
                ticks: {
                    color: '#FFFFFF', // Change tick labels color to white
                    font: {
                        size: 14 // Change tick size here
                    },
                    display: false,
                    maxTicksLimit: 5
                },
                grid: {
                    display: false, // Hide grid lines
                    // drawBorder: true
                }
            }
        }
    };
    const getGradient = (ctx: any, chartArea: any) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, '#BC5EF8');    // Transparent at the start
        gradient.addColorStop(0.25, '#BC5EF8'); // Weekday 1 color
        gradient.addColorStop(0.5, '#F19A2D');  // Weekday 2 color
        gradient.addColorStop(0.75, '#F19A2D'); // Weekday 3 color
        gradient.addColorStop(1, '#F19A2D');    // Transparent at the end
        return gradient;
    };
    const data = {
        labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Transaction',
                data: amounts,
                fill: true, // Set to true to enable fill
                pointBorderColor: 'rgba(0, 0, 0, 0)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0)',
                // backgroundColor: (context) => {
                //     const chart = context.chart;
                //     const { ctx, chartArea } = chart;

                //     if (!chartArea) {
                //         // This case happens on initial chart render
                //         return;
                //     }
                //     return getGradient(ctx, chartArea);
                // }, // Use Tailwind fill color
                backgroundColor: 'transparent',
                borderColor: (context: any) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) {
                        // This case happens on initial chart render
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
                tension: .4,
                borderWidth: 7
            }
        ]
    };


    return (
        <div className="w-full h-1/2">
            <div className="relative w-full h-full "> {/* Set fixed height for the chart */}
                <Line options={options} data={data} />
            </div>
        </div>
    );
}

export default TransactionGraph;

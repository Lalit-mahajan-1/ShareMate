import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { AppContext } from '../Navbar/UserInfo';
import axios from 'axios';
import "./NotesChart.css";
import CountUp from './CountUp'

const margin = { right: 24 };
const month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const MonthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const CurrMonth = (new Date()).getMonth();

export default function NotesChart() {
    const { user, setUser } = React.useContext(AppContext);
    const [xLabels, setXLabels] = React.useState([]);
    const [pData, setPdata] = React.useState([]);
    const [NoteCount, setNoteCount] = React.useState(0);

    React.useEffect(() => {
        if (!user) {
            return;
        }
        const fetchData = async () => {

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_SERVR_URL}/Notes/NoteCount/${user.id}`,
                    { withCredentials: true }
                );
                const arr = new Array(month[CurrMonth]).fill(0).map((_, i) => i + 1);
                const yvalue = new Array(month[CurrMonth]).fill(0);
                const days = res.data.map((data) => {
                    let s = data.ImgURL;
                    let ans = Number([...([...s].reverse().join("").substr(0, 17))].reverse().join("").substr(0, 13))

                    if (new Date(ans).getMonth() == CurrMonth) {
                        return new Date(ans).getDate();
                    }
                    else {
                        return 0;
                    }
                });
                console.log(days)
                for (let i = 0; i < days.length; i++) {
                    if (days[i] - 1 >= 0) {
                        yvalue[days[i] - 1]++;
                    }
                }
                setNoteCount(days.length);
                setXLabels(arr);
                setPdata(yvalue);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [user]);

    return (
        <div className="notes-chart-container">
            <div className="notes-header">
                <div className="notes-title">All Time Notes</div>
                <div className="count">
                    <CountUp
                        from={0}
                        to={NoteCount}
                        duration={1}
                        className="notes-count"
                    />
                </div>
                <div className="month-name">{MonthName[CurrMonth]}</div>
            </div>

            <div className="notes-graph">
                <LineChart
                    height={220}
                    series={[
                        {
                            data: pData,
                            label: 'Notes',
                            color: 'var(--chart-line)', 
                            showMark: false, 
                        },
                    ]}
                    xAxis={[
                        {
                            scaleType: 'point',
                            data: xLabels,
                            tickLabelStyle: { fill: 'var(--text-color)' },
                        },
                    ]}
                    yAxis={[
                        {
                            width: 50,
                            tickLabelStyle: { fill: 'var(--text-color)' },
                        },
                    ]}
                    margin={margin}
                    sx={{
                        '& .MuiChartsAxis-line': {
                            stroke: 'var(--chart-axis)',
                        },
                        '& .MuiChartsGrid-line': {
                            stroke: 'var(--chart-grid)',
                        },
                        '& .MuiChartsLegend-root .MuiTypography-root': {
                            color: 'var(--text-color)',
                        },
                    }}
                />
            </div>
        </div>
    );
}

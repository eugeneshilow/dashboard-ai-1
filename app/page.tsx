'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { marketData, MarketData } from './data/market-data';
import { newsData, NewsItem } from './data/news-data';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const RADIAN = Math.PI / 180;

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Home() {
  const pieData = [
    { name: 'AI Robotics', value: marketData[marketData.length-1]['AI Robotics'] },
    { name: 'Autonomous & Sensor', value: marketData[marketData.length-1]['Autonomous & Sensor Technology'] },
    { name: 'Computer Vision', value: marketData[marketData.length-1]['Computer Vision'] },
    { name: 'Machine Learning', value: marketData[marketData.length-1]['Machine Learning'] },
    { name: 'NLP', value: marketData[marketData.length-1]['Natural Language Processing'] }
  ];

  return (
    <div className="h-screen w-full p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-2">AI Market Analysis Dashboard</h1>
      
      <div className="flex-1 grid grid-cols-[2fr,1fr] grid-rows-2 gap-4">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">Market Size Growth</h2>
          <div className="h-[90%]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketData}>
                <XAxis dataKey="year" />
                <YAxis label={{ value: 'USD (Billions)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Natural Language Processing" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Machine Learning" stackId="a" fill="#ffc658" />
                <Bar dataKey="Computer Vision" stackId="a" fill="#8884d8" />
                <Bar dataKey="Autonomous & Sensor Technology" stackId="a" fill="#000000" />
                <Bar dataKey="AI Robotics" stackId="a" fill="#0066cc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* News Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow row-span-2 overflow-y-auto">
          <h2 className="text-xl font-bold sticky top-0 bg-gray-50 pb-2">Latest AI News</h2>
          <div className="space-y-2">
            {newsData.map((news, index) => (
              <div key={index} className="border-b border-gray-200 pb-2 last:border-b-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-sm">{news.title}</h3>
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                <ul className="list-disc list-inside text-xs text-gray-600 mb-1">
                  {news.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400">Source: {news.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold">2030 Market Distribution</h2>
          <div className="h-[90%]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}B`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
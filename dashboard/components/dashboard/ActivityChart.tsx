'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ActivityChartProps {
  data: any[]
}

export function ActivityChart({ data }: ActivityChartProps) {
  // Transform data for the chart
  const chartData = data.slice(-30).map((item, index) => ({
    day: `Day ${index + 1}`,
    archives: item.archives || 0,
    resources: item.resources || 0,
  }))

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Activity Trends</h3>
        <p className="text-sm text-gray-600">Archives and resources over the last 30 days</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="archives" 
              stroke="#5865f2" 
              strokeWidth={2}
              dot={{ fill: '#5865f2', strokeWidth: 2, r: 4 }}
              name="Archives"
            />
            <Line 
              type="monotone" 
              dataKey="resources" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Resources"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
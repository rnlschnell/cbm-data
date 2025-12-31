import { BaseChart } from './BaseChart'
import type { EChartsOption } from 'echarts'

interface LineChartProps {
  data: { date: string; value: number }[]
  height?: number
  areaFill?: boolean
  smooth?: boolean
  showDots?: boolean
}

export function LineChart({
  data,
  height = 300,
  areaFill = true,
  smooth = true,
  showDots = false,
}: LineChartProps) {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#f59e0b',
        },
      },
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.date),
      axisLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.6)' } },
      axisLabel: {
        color: '#737373',
        rotate: 45,
        fontSize: 10,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.6)' } },
      splitLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.2)' } },
      axisLabel: { color: '#737373' },
    },
    series: [
      {
        type: 'line',
        data: data.map((d) => d.value),
        smooth,
        symbol: showDots ? 'circle' : 'none',
        symbolSize: 6,
        lineStyle: {
          color: '#f59e0b',
          width: 3,
        },
        itemStyle: {
          color: '#f59e0b',
        },
        areaStyle: areaFill
          ? {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(245, 158, 11, 0.4)' },
                  { offset: 1, color: 'rgba(245, 158, 11, 0.02)' },
                ],
              },
            }
          : undefined,
      },
    ],
  }

  return <BaseChart option={option} height={height} />
}

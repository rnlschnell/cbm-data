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
          color: '#006a34',
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
      axisLine: { lineStyle: { color: 'rgba(229, 229, 229, 1)' } },
      axisLabel: {
        color: '#525252',
        rotate: 45,
        fontSize: 10,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(229, 229, 229, 1)' } },
      splitLine: { lineStyle: { color: 'rgba(229, 229, 229, 0.6)' } },
      axisLabel: { color: '#525252' },
    },
    series: [
      {
        type: 'line',
        data: data.map((d) => d.value),
        smooth,
        symbol: showDots ? 'circle' : 'none',
        symbolSize: 6,
        lineStyle: {
          color: '#006a34',
          width: 3,
        },
        itemStyle: {
          color: '#006a34',
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
                  { offset: 0, color: 'rgba(0, 106, 52, 0.3)' },
                  { offset: 1, color: 'rgba(0, 106, 52, 0.02)' },
                ],
              },
            }
          : undefined,
      },
    ],
  }

  return <BaseChart option={option} height={height} />
}

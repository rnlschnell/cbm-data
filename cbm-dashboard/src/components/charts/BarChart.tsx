import { BaseChart } from './BaseChart'
import type { EChartsOption } from 'echarts'

interface BarChartProps {
  data: { name: string; value: number; color?: string }[]
  height?: number
  horizontal?: boolean
  showValues?: boolean
  gradient?: boolean
}

export function BarChart({
  data,
  height = 300,
  horizontal = false,
  showValues = true,
  gradient = true,
}: BarChartProps) {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: horizontal ? '20%' : '10%',
      right: '10%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: horizontal
      ? {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.6)' } },
          splitLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.2)' } },
          axisLabel: { color: '#737373' },
        }
      : {
          type: 'category',
          data: data.map((d) => d.name),
          axisLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.6)' } },
          axisLabel: { color: '#737373', rotate: data.length > 6 ? 45 : 0 },
        },
    yAxis: horizontal
      ? {
          type: 'category',
          data: data.map((d) => d.name),
          axisLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.6)' } },
          axisLabel: { color: '#a3a3a3' },
        }
      : {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.6)' } },
          splitLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.2)' } },
          axisLabel: { color: '#737373' },
        },
    series: [
      {
        type: 'bar',
        data: data.map((d) => ({
          value: d.value,
          itemStyle: d.color
            ? { color: d.color }
            : gradient
              ? {
                  color: {
                    type: 'linear',
                    x: horizontal ? 0 : 0,
                    y: horizontal ? 0 : 1,
                    x2: horizontal ? 1 : 0,
                    y2: 0,
                    colorStops: [
                      { offset: 0, color: 'rgba(245, 158, 11, 0.8)' },
                      { offset: 1, color: 'rgba(249, 115, 22, 0.8)' },
                    ],
                  },
                }
              : undefined,
        })),
        barWidth: '60%',
        itemStyle: {
          borderRadius: horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0],
        },
        label: showValues
          ? {
              show: true,
              position: horizontal ? 'right' : 'top',
              color: '#a3a3a3',
              fontSize: 11,
            }
          : undefined,
      },
    ],
  }

  return <BaseChart option={option} height={height} />
}

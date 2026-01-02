import { BaseChart } from './BaseChart'
import type { EChartsOption } from 'echarts'

interface HeatmapChartProps {
  data: { x: string; y: string; value: number }[]
  xLabels: string[]
  yLabels: string[]
  height?: number
}

export function HeatmapChart({ data, xLabels, yLabels, height = 400 }: HeatmapChartProps) {
  const heatmapData = data.map((item) => [
    xLabels.indexOf(item.x),
    yLabels.indexOf(item.y),
    item.value,
  ])

  const maxValue = Math.max(...data.map((d) => d.value))

  const option: EChartsOption = {
    tooltip: {
      position: 'top',
      formatter: (params: unknown) => {
        const p = params as { data: number[] }
        const x = xLabels[p.data[0]]
        const y = yLabels[p.data[1]]
        const value = p.data[2]
        return `${y} × ${x}<br/>Count: <strong>${value}</strong>`
      },
    },
    grid: {
      left: '15%',
      right: '12%',
      bottom: '20%',
      top: '5%',
    },
    xAxis: {
      type: 'category',
      data: xLabels,
      splitArea: { show: true },
      axisLabel: {
        color: '#525252',
        rotate: 45,
        fontSize: 10,
      },
      axisLine: { lineStyle: { color: 'rgba(229, 229, 229, 1)' } },
    },
    yAxis: {
      type: 'category',
      data: yLabels,
      splitArea: { show: true },
      axisLabel: {
        color: '#525252',
        fontSize: 11,
      },
      axisLine: { lineStyle: { color: 'rgba(229, 229, 229, 1)' } },
    },
    visualMap: {
      min: 0,
      max: maxValue,
      calculable: true,
      orient: 'vertical',
      right: '2%',
      top: 'center',
      inRange: {
        color: ['#f0fdf4', '#bbf7d0', '#4ade80', '#16a34a', '#006a34'],
      },
      textStyle: {
        color: '#525252',
      },
    },
    series: [
      {
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: true,
          color: '#262626',
          fontSize: 10,
          formatter: (params: unknown) => {
            const p = params as { data: number[] }
            return p.data[2] > 0 ? String(p.data[2]) : ''
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 106, 52, 0.5)',
          },
        },
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      },
    ],
  }

  return <BaseChart option={option} height={height} />
}

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
        color: '#a3a3a3',
        rotate: 45,
        fontSize: 10,
      },
      axisLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.6)' } },
    },
    yAxis: {
      type: 'category',
      data: yLabels,
      splitArea: { show: true },
      axisLabel: {
        color: '#a3a3a3',
        fontSize: 11,
      },
      axisLine: { lineStyle: { color: 'rgba(64, 64, 64, 0.6)' } },
    },
    visualMap: {
      min: 0,
      max: maxValue,
      calculable: true,
      orient: 'vertical',
      right: '2%',
      top: 'center',
      inRange: {
        color: ['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#ff6b6b'],
      },
      textStyle: {
        color: '#a3a3a3',
      },
    },
    series: [
      {
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: true,
          color: '#fff',
          fontSize: 10,
          formatter: (params: unknown) => {
            const p = params as { data: number[] }
            return p.data[2] > 0 ? String(p.data[2]) : ''
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(245, 158, 11, 0.5)',
          },
        },
        itemStyle: {
          borderColor: '#1a1a1a',
          borderWidth: 1,
        },
      },
    ],
  }

  return <BaseChart option={option} height={height} />
}

import { BaseChart } from './BaseChart'
import type { EChartsOption } from 'echarts'

interface DonutChartProps {
  data: { name: string; value: number; color?: string }[]
  height?: number
  showLegend?: boolean
  centerLabel?: string
  centerValue?: string | number
}

export function DonutChart({
  data,
  height = 300,
  showLegend = true,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: showLegend
      ? {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: { color: '#a3a3a3' },
        }
      : undefined,
    series: [
      {
        type: 'pie',
        radius: ['50%', '75%'],
        center: showLegend ? ['35%', '50%'] : ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#1a1a1a',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
          },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(245, 158, 11, 0.4)',
          },
        },
        data: data.map((item) => ({
          name: item.name,
          value: item.value,
          itemStyle: item.color ? { color: item.color } : undefined,
        })),
      },
    ],
    graphic: centerLabel
      ? [
          {
            type: 'group',
            left: showLegend ? '28%' : 'center',
            top: 'center',
            children: [
              {
                type: 'text',
                style: {
                  text: String(centerValue),
                  fontSize: 28,
                  fontWeight: 'bold',
                  fontFamily: 'Archivo Black',
                  fill: '#f5f5f5',
                },
                left: 'center',
              },
              {
                type: 'text',
                style: {
                  text: centerLabel,
                  fontSize: 12,
                  fill: '#737373',
                },
                left: 'center',
                top: 35,
              },
            ],
          },
        ] as const
      : undefined,
  }

  return <BaseChart option={option} height={height} />
}

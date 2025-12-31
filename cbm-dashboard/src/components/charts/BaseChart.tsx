import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart, HeatmapChart as EHeatmapChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DataZoomComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import { chartTheme } from '@/constants/colors'

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  EHeatmapChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  DataZoomComponent,
  CanvasRenderer,
])

interface BaseChartProps {
  option: EChartsOption
  height?: string | number
  className?: string
}

export function BaseChart({ option, height = 350, className }: BaseChartProps) {
  const mergedOption: EChartsOption = {
    ...option,
    backgroundColor: chartTheme.backgroundColor,
    textStyle: chartTheme.textStyle,
    tooltip: {
      ...chartTheme.tooltip,
      ...(option.tooltip as object),
    },
    legend: {
      ...chartTheme.legend,
      ...(option.legend as object),
    },
  }

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={mergedOption}
      style={{ height, width: '100%' }}
      className={className}
      opts={{ renderer: 'canvas' }}
    />
  )
}

export { echarts }

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import 'echarts-wordcloud'

interface WordCloudChartProps {
  data: { name: string; value: number }[]
  height?: number
}

export function WordCloudChart({ data, height = 400 }: WordCloudChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current)
    }

    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316']

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        show: true,
        backgroundColor: 'rgba(23, 23, 23, 0.95)',
        borderColor: 'rgba(64, 64, 64, 0.8)',
        textStyle: {
          color: '#e5e5e5',
        },
        formatter: (params: { name: string; value: number }) => {
          return `${params.name}: ${params.value}`
        },
      },
      series: [
        {
          type: 'wordCloud',
          shape: 'circle',
          left: 'center',
          top: 'center',
          width: '90%',
          height: '90%',
          sizeRange: [14, 60],
          rotationRange: [-30, 30],
          rotationStep: 15,
          gridSize: 8,
          drawOutOfBound: false,
          layoutAnimation: true,
          textStyle: {
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 'bold',
            color: () => colors[Math.floor(Math.random() * colors.length)],
          },
          emphasis: {
            textStyle: {
              textShadowBlur: 10,
              textShadowColor: 'rgba(245, 158, 11, 0.5)',
            },
          },
          data: data.slice(0, 80),
        },
      ],
    }

    chartInstance.current.setOption(option)

    const handleResize = () => {
      chartInstance.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [data])

  return <div ref={chartRef} style={{ height, width: '100%' }} />
}

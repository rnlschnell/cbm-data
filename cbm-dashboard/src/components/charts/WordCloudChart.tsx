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

    const colors = ['#006a34', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#0d9488']

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        show: true,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderColor: 'rgba(229, 229, 229, 1)',
        textStyle: {
          color: '#262626',
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
              textShadowColor: 'rgba(0, 106, 52, 0.5)',
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

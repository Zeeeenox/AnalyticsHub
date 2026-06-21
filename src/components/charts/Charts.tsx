import { cn } from '../../utils';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
  className?: string;
}

export function Sparkline({
  data,
  width = 100,
  height = 30,
  color = '#3b82f6',
  fill = true,
  className,
}: SparklineProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const linePoints = points.join(' ');
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`;

  return (
    <svg width={width} height={height} className={cn('overflow-visible', className)}>
      {fill && (
        <polygon
          points={areaPoints}
          fill={color}
          fillOpacity={0.15}
        />
      )}
      <polyline
        points={linePoints}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  horizontal?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  className?: string;
  onBarClick?: (index: number) => void;
}

export function BarChart({
  data,
  height = 200,
  horizontal = false,
  showLabels = true,
  showValues = false,
  className,
  onBarClick,
}: BarChartProps) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));

  if (horizontal) {
    return (
      <div className={cn('space-y-2', className)} style={{ height }}>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex items-center gap-3"
              onClick={() => onBarClick?.(index)}
              role={onBarClick ? 'button' : undefined}
              tabIndex={onBarClick ? 0 : undefined}
            >
              {showLabels && (
                <span className="text-sm text-secondary-600 w-24 truncate">{item.label}</span>
              )}
              <div className="flex-1 h-8 bg-secondary-100 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color || '#3b82f6',
                  }}
                />
              </div>
              {showValues && (
                <span className="text-sm font-medium text-secondary-800 w-12 text-right">
                  {item.value.toLocaleString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('relative', className)} style={{ height }}>
      <div className="flex items-end justify-around h-full gap-2">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1"
              onClick={() => onBarClick?.(index)}
              role={onBarClick ? 'button' : undefined}
              tabIndex={onBarClick ? 0 : undefined}
            >
              <div className="w-full relative flex-1 flex items-end">
                <div
                  className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{
                    height: `${percentage}%`,
                    backgroundColor: item.color || '#3b82f6',
                  }}
                />
              </div>
              {showLabels && (
                <span className="text-xs text-secondary-600 truncate w-full text-center">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {showValues && (
        <div className="flex items-end justify-around gap-2 mt-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 text-center">
              <span className="text-xs font-medium text-secondary-800">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface LineChartProps {
  data: { label: string; values: number[]; color?: string }[];
  labels: string[];
  height?: number;
  showGrid?: boolean;
  showDots?: boolean;
  showLegend?: boolean;
  className?: string;
}

export function LineChart({
  data,
  labels,
  height = 200,
  showGrid = true,
  showDots = true,
  showLegend = true,
  className,
}: LineChartProps) {
  if (data.length === 0 || labels.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = 400 - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const allValues = data.flatMap((d) => d.values);
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const range = maxValue - minValue || 1;

  const colors = data.map((d, i) => d.color || ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 4]);

  const getPoint = (value: number, index: number, arrLength: number) => {
    const x = padding.left + (index / (arrLength - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight;
    return { x, y };
  };

  return (
    <div className={className}>
      <svg width="100%" height={height} viewBox={`0 0 400 ${height}`} preserveAspectRatio="xMidYMid meet">
        {showGrid && (
          <>
            {/* Horizontal grid lines */}
            {Array.from({ length: 5 }).map((_, i) => {
              const y = padding.top + (i / 4) * chartHeight;
              return (
                <line
                  key={`h-${i}`}
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + chartWidth}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeWidth={1}
                />
              );
            })}
            {/* Vertical grid lines */}
            {labels.map((_, i) => {
              const x = padding.left + (i / (labels.length - 1)) * chartWidth;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + chartHeight}
                  stroke="#e2e8f0"
                  strokeWidth={1}
                />
              );
            })}
          </>
        )}

        {/* Y-axis labels */}
        {Array.from({ length: 5 }).map((_, i) => {
          const value = minValue + ((4 - i) / 4) * range;
          const y = padding.top + (i / 4) * chartHeight;
          return (
            <text
              key={`y-${i}`}
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              className="text-xs fill-secondary-500"
            >
              {Math.round(value).toLocaleString()}
            </text>
          );
        })}

        {/* X-axis labels */}
        {labels.map((label, i) => {
          const x = padding.left + (i / (labels.length - 1)) * chartWidth;
          return (
            <text
              key={`x-${i}`}
              x={x}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-secondary-500"
            >
              {label}
            </text>
          );
        })}

        {/* Line paths */}
        {data.map((series, seriesIndex) => {
          const points = series.values.map((value, index) => {
            const { x, y } = getPoint(value, index, series.values.length);
            return `${x},${y}`;
          });
          const linePoints = points.join(' L ');

          return (
            <g key={seriesIndex}>
              <path
                d={`M ${linePoints}`}
                fill="none"
                stroke={colors[seriesIndex]}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {showDots && series.values.map((value, index) => {
                const { x, y } = getPoint(value, index, series.values.length);
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r={4}
                    fill="#fff"
                    stroke={colors[seriesIndex]}
                    strokeWidth={2}
                    className="hover:r-6 transition-all"
                  />
                );
              })}
            </g>
          );
        })}
      </svg>

      {showLegend && data.length > 1 && (
        <div className="flex flex-wrap items-center gap-4 mt-4">
          {data.map((series, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              />
              <span className="text-sm text-secondary-600">{series.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface DonutChartProps {
  data: { label: string; value: number; color?: string }[];
  size?: number;
  strokeWidth?: number;
  showLegend?: boolean;
  showCenter?: boolean;
  centerLabel?: string;
  centerValue?: string;
  className?: string;
}

export function DonutChart({
  data,
  size = 200,
  strokeWidth = 30,
  showLegend = true,
  showCenter = true,
  centerLabel,
  centerValue,
  className,
}: DonutChartProps) {
  if (data.length === 0) return null;

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  let accumulatedOffset = 0;

  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        {/* Data arcs */}
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const offset = (percentage / 100) * circumference;
          const color = item.color || defaultColors[index % defaultColors.length];

          const arc = (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${offset} ${circumference}`}
              strokeDashoffset={-accumulatedOffset}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          );
          accumulatedOffset += offset;
          return arc;
        })}
      </svg>
      {showCenter && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-2xl font-semibold text-secondary-900">{centerValue}</span>}
          {centerLabel && <span className="text-sm text-secondary-500">{centerLabel}</span>}
        </div>
      )}
      {showLegend && (
        <div className="absolute -bottom-16 left-0 right-0 flex flex-wrap justify-center gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.color || defaultColors[index % defaultColors.length] }}
              />
              <span className="text-sm text-secondary-600">
                {item.label}: {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface FunnelChartProps {
  data: { label: string; value: number }[];
  height?: number;
  showLabels?: boolean;
  showPercentage?: boolean;
  className?: string;
}

export function FunnelChart({
  data,
  height = 300,
  showLabels = true,
  showPercentage = true,
  className,
}: FunnelChartProps) {
  if (data.length === 0) return null;

  const maxValue = data[0].value;

  return (
    <div className={cn('space-y-2', className)} style={{ height }}>
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        const narrowingFactor = ((data.length - index) / data.length) * 30;
        const bgColor = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'][index % 5];

        return (
          <div key={index} className="relative">
            <div
              className="text-center py-3 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
              style={{
                width: `${100 - narrowingFactor}%`,
                marginLeft: `${narrowingFactor / 2}%`,
                backgroundColor: bgColor,
                borderRadius: '4px',
              }}
            >
              {showLabels && item.label}
              {showLabels && showPercentage && ' - '}
              {showPercentage && `${percentage.toFixed(1)}%`}
            </div>
          </div>
        );
      })}
    </div>
  );
}

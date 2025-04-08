const DrawLine: React.FC<{
  x_start: number;
  y_start: number;
  length: number;
  angle: number;
  label?: string;
  className?: string;
}> = ({ x_start, y_start, length, angle, label, className }) => {
  const radians = (angle: number) => ((angle - 90) * Math.PI) / 180;

  const x_end = x_start + length * Math.cos(radians(angle));
  const y_end = y_start + length * Math.sin(radians(angle));
  const label_x = x_start + (length + 7) * Math.cos(radians(angle));
  const label_y = y_start + (length + 7) * Math.sin(radians(angle));

  return (
    <>
      <line className={className} x1={x_start} y1={y_start} x2={x_end} y2={y_end} />
      {label && (
        <text
          x={label_x}
          y={label_y}
          className={className}
          fontSize="6"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      )}
    </>
  );
};

export default DrawLine;

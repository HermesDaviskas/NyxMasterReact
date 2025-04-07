const DrawLine: React.FC<{
  x_start: number;
  y_start: number;
  length: number;
  angle: number;
  className?: string; // Accept className as a prop
}> = ({ x_start, y_start, length, angle, className }) => {
  const radians = (angle: number) => (angle * Math.PI) / 180;

  const x_end = x_start + length * Math.cos(radians(angle));
  const y_end = y_start + length * Math.sin(radians(angle));

  return (
    <line
      className={className} // Apply the className to the <line> element
      x1={x_start}
      y1={y_start}
      x2={x_end}
      y2={y_end}
    />
  );
};

export default DrawLine;

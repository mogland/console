export function calculateMousePosition(e: React.MouseEvent<MouseEvent>) {
  const { clientX, clientY } = e;
  return {
    x: clientX,
    y: clientY,
  };
}

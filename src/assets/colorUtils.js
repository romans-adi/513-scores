const getLeagueItemBackgroundColor = (index) => {
  const square1Color = 'rgba(65, 103, 174, 1)';
  const square2Color = 'rgba(65, 103, 174, 0.5)';

  const gridSize = 2;

  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  const isSquare1 = (row + col) % 2 === 0;

  return isSquare1 ? square1Color : square2Color;
};

export default getLeagueItemBackgroundColor;

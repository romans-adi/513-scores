const getLeagueItemBackgroundColor = (index) => {
  const square1Color = 'rgba(65, 103, 174, 1)';
  const square2Color = 'rgba(65, 103, 174, 0.5)';

  return index % 4 === 1 || index % 4 === 2 ? square1Color : square2Color;
};

export default getLeagueItemBackgroundColor;

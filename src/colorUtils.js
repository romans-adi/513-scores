const getLeagueItemBackgroundColor = (id) => {
  const square1Color = 'rgba(65, 103, 174, 1)';
  const square2Color = 'rgba(65, 103, 174, 0.5)';
  return id % 2 === 0 ? square1Color : square2Color;
};

export default getLeagueItemBackgroundColor;

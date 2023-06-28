import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import countriesAbbreviations from '../countries';
import { fetchCategoriesData, fetchSectionsData } from '../redux/categories/categoriesSlice';
import LoadingIndicator from '../components/Indicators/LoadingIndicator';
import ErrorIndicator from '../components/Indicators/ErrorIndicator';
import LeagueIcon from '../components/Items/LeagueIcon';
import TournamentItem from '../components/Items/TournamentItem';
import EventItem from '../components/Items/EventItem';
import LeagueItem from '../components/Items/LeagueItem';
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.categories);
  const [tournamentList, setTournamentList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);

  const getLeagueItemBackgroundColor = (id) => {
    const square1Color = 'rgb(65, 103, 174)';
    const square2Color = 'rgb(66, 98, 255)';
    return id % 2 === 0 ? square1Color : square2Color;
  };

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  const handleCategoryClick = async (categoryId) => {
    try {
      const response = await dispatch(fetchSectionsData(categoryId));
      const tournaments = response.payload.map((section) => ({
        name: section.name,
        countryCode: countriesAbbreviations[section.name] || '',
        eventId: section.id,
      }));
      setTournamentList(tournaments);
      setEventList([]);
      setSelectedLeague(null);
    } catch (error) {
      console.log('Error fetching tournaments:', error);
    }
  };

  const handleTournamentClick = async (sportId) => {
    try {
      const options = {
        method: 'GET',
        url: `https://sportscore1.p.rapidapi.com/sections/${sportId}/events`,
        params: { page: '1' },
        headers: {
          'X-RapidAPI-Key': '74774a281amsh81cee264c6afea5p19fb9djsn5dd3412499d5',
          'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      const { league } = response.data.data[0];

      setSelectedLeague(league);
      setEventList([]);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleLeagueClick = async (leagueId) => {
    try {
      const options = {
        method: 'GET',
        url: `https://sportscore1.p.rapidapi.com/leagues/${leagueId}/events`,
        params: { page: '1' },
        headers: {
          'X-RapidAPI-Key': '74774a281amsh81cee264c6afea5p19fb9djsn5dd3412499d5',
          'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      const events = response.data.data;
      setEventList(events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  } else if (error) {
    content = <ErrorIndicator error={error} />;
  } else if (categories && categories.length > 0) {
    if (eventList.length > 0) {
      content = (
        <div className="events-container">
          <h3>Events:</h3>
          <ul>
            {eventList.map((event) => (
              <EventItem
                key={event.name}
                event={event}
                style={{ backgroundColor: getLeagueItemBackgroundColor(event.id) }}
              />
            ))}
          </ul>
        </div>
      );
    } else if (selectedLeague) {
      content = (
        <div className="selected-league-container">
          <LeagueIcon
            logo={selectedLeague.logo}
            name={selectedLeague.name}
            handleClick={() => handleLeagueClick(selectedLeague.id)}
          />
        </div>
      );
    } else if (tournamentList.length > 0) {
      content = (
        <div className="leagues-container">
          <div className="tournament-list">
            {tournamentList.map((tournament) => (
              <TournamentItem
                key={tournament.name}
                tournament={tournament}
                handleTournamentClick={handleTournamentClick}
                style={{ backgroundColor: getLeagueItemBackgroundColor(tournamentList.id) }}
              />
            ))}
          </div>
        </div>
      );
    } else {
      content = (
        <div className="leagues-container">
          {categories.map((category) => (
            <LeagueItem
              key={category.id}
              category={category}
              handleCategoryClick={handleCategoryClick}
              style={{ backgroundColor: getLeagueItemBackgroundColor(category.id) }}
            />
          ))}
        </div>
      );
    }
  } else {
    content = <p>No categories found.</p>;
  }

  return (
    <div>
      <h1 className="home-heading">All Events:</h1>
      {content}
    </div>
  );
};

export default Home;

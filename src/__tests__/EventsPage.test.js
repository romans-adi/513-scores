import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import EventsPage from '../views/EventsPage';
import EventItem from '../components/Items/EventItem';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../components/Items/EventItem', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('EventsPage', () => {
  beforeEach(() => {
    useSelector.mockClear();
    EventItem.mockClear();
  });

  test('renders event items correctly', () => {
    const mockEventList = [
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' },
    ];

    useSelector.mockReturnValueOnce(mockEventList);

    render(<EventsPage />);

    expect(EventItem).toHaveBeenCalledTimes(mockEventList.length);

    mockEventList.forEach((event, index) => {
      expect(EventItem).toHaveBeenNthCalledWith(index + 1, {
        name: event.name,
        id: event.id,
        key: event.id.toString(),
        event,
        index, // Update this line
      });
    });
  });

  test('renders no event items when event list is empty', () => {
    const mockEventList = [];

    useSelector.mockReturnValueOnce(mockEventList);

    render(<EventsPage />);

    expect(EventItem).not.toHaveBeenCalled();
  });
});

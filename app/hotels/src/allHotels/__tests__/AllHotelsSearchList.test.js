// @flow
import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { AllHotelsSearchList } from '../AllHotelsSearchList';

const renderer = new ShallowRenderer();
const voidCallback = () => {};

it('renders found hotels', () => {
  const data = {
    edges: [
      {
        node: {
          id: 'hotel1',
        },
      },
      {
        node: {
          id: 'hotel2',
        },
      },
    ],
    stats: {
      priceMax: 9000,
    },
  };

  renderer.render(
    <AllHotelsSearchList
      data={data}
      openSingleHotel={voidCallback}
      setCurrentSearchStats={jest.fn()}
    />,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('renders a "not found" message when no hotel is found', () => {
  const data = {
    edges: [],
    stats: {
      priceMax: 0,
    },
  };

  renderer.render(
    <AllHotelsSearchList
      data={data}
      openSingleHotel={voidCallback}
      setCurrentSearchStats={jest.fn()}
    />,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('renders a "not found" message when data is missing', () => {
  const data = {
    edges: null,
    stats: { priceMax: 9000 },
  };

  renderer.render(
    <AllHotelsSearchList
      data={data}
      openSingleHotel={voidCallback}
      setCurrentSearchStats={jest.fn()}
    />,
  );
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});

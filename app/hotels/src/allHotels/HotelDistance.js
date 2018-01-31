// @flow

import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Text, StyleSheet } from 'react-native';
import idx from 'idx';
import { Color } from '@kiwicom/react-native-app-common';

import type { HotelDistance_hotel } from './__generated__/HotelDistance_hotel.graphql';

type Props = {|
  hotel: HotelDistance_hotel,
|};

const style = StyleSheet.create({
  text: {
    color: Color.grey.$600,
  },
});

// 1.5 km city center radius
const CITY_CENTER_RADIUS = 1.5;

function HotelDistance({ hotel }: Props) {
  const distance = idx(hotel, _ => _.distanceFromCenter) || null;
  if (distance === null) {
    return null;
  }

  const distanceFromCityCenter = distance - CITY_CENTER_RADIUS;
  let distanceText = '';
  if (distance <= CITY_CENTER_RADIUS + 0.1) {
    // All hotels in radius as 100m above consider as in the city center.
    // 100m extra is to avoid showing less then 100m as distance.
    distanceText = 'In the city center';
  } else if (distanceFromCityCenter < 1) {
    // 1 km from city center radius shows in meters
    distanceText = `${Math.round(distanceFromCityCenter * 1000)} m from center`;
  } else {
    distanceText = `${distanceFromCityCenter.toFixed(1)} km from center`;
  }

  return <Text style={style.text}>{distanceText}</Text>;
}

export default createFragmentContainer(
  HotelDistance,
  graphql`
    fragment HotelDistance_hotel on Hotel {
      distanceFromCenter
    }
  `,
);

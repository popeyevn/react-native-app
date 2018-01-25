// @flow

import * as React from 'react';
import idx from 'idx';
import { createFragmentContainer, graphql } from 'react-relay';
import { ScrollView, Text } from 'react-native';
import { connect } from '@kiwicom/react-native-app-redux';
import { CenteredView, Logger } from '@kiwicom/react-native-app-common';

import AllHotelsSearchRow from './AllHotelsSearchRow';
import type { AllHotelsSearchList as AllHotelsSearchListProps } from './__generated__/AllHotelsSearchList.graphql';
import type { HotelsReducerActions } from '../HotelsReducer';
import type { PriceRanges } from '../filter/FilterParametersType';

type ComponentProps = {
  openSingleHotel: (id: string) => void,
  data: AllHotelsSearchListProps,
};

type DispatchProps = {
  onPriceRangeChange: PriceRanges => void,
};

type Props = ComponentProps & DispatchProps;

export class AllHotelsSearchList extends React.Component<Props> {
  getPriceMax = (data: AllHotelsSearchListProps) => {
    return idx(data, _ => _.stats.priceMax) || null;
  };

  getPriceMin = (data: AllHotelsSearchListProps) => {
    return idx(data, _ => _.stats.priceMin) || null;
  };

  componentWillReceiveProps = (nextProps: Props) => {
    this.checkCurrentPriceRange(nextProps);
  };

  componentDidMount = () => {
    Logger.LogEvent(Logger.Event.Displayed, Logger.Category.Ancillary, {
      type: 'Hotels',
      step: 'results',
    });

    const priceMax = this.getPriceMax(this.props.data);
    const priceMin = this.getPriceMin(this.props.data);
    this.props.onPriceRangeChange({ priceMax, priceMin });
  };

  checkCurrentPriceRange = (nextProps: Props) => {
    const priceMax = this.getPriceMax(nextProps.data);
    const priceMin = this.getPriceMin(nextProps.data);
    const currentMaxPrice = this.getPriceMin(this.props.data);
    const currentMinPrice = this.getPriceMax(this.props.data);

    if (priceMax !== currentMaxPrice || priceMin !== currentMinPrice) {
      this.props.onPriceRangeChange({ priceMax, priceMin });
    }
  };

  render = () => {
    const hotels = idx(this.props, _ => _.data.edges) || [];

    if (hotels.length === 0) {
      return (
        <CenteredView>
          <Text>No hotels found</Text>
        </CenteredView>
      );
    } else {
      return (
        <ScrollView>
          {hotels.map(edge => {
            if (edge) {
              const { node: hotel } = edge;
              return (
                <AllHotelsSearchRow
                  data={hotel}
                  openSingleHotel={this.props.openSingleHotel}
                  key={hotel && hotel.id}
                />
              );
            }
          })}
        </ScrollView>
      );
    }
  };
}

const actions = (dispatch: HotelsReducerActions => void): DispatchProps => ({
  onPriceRangeChange: priceRanges =>
    dispatch({
      type: 'setPriceRanges',
      priceRanges,
    }),
});

const WrappedAllHotelsSearchList = connect(null, actions)(AllHotelsSearchList);

export default createFragmentContainer(
  WrappedAllHotelsSearchList,
  graphql`
    fragment AllHotelsSearchList on HotelAvailabilityConnection {
      edges {
        node {
          id
          ...AllHotelsSearchRow
        }
      }
      stats {
        priceMax
        priceMin
      }
    }
  `,
);

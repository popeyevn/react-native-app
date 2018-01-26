// @flow

import * as React from 'react';
import { View } from 'react-native';
import { connect } from '@kiwicom/react-native-app-redux';

import PricePopup from './PricePopup';
import FilterButton from '../FilterButton';
import type { OnChangeFilterParams } from '../FilterParametersType';
import type { CurrentSearchStats } from '../../HotelsReducer';

export const MIN_PRICE = 0;

type Props = {|
  start: number | null,
  end: number | null,
  currency: string,
  onChange: OnChangeFilterParams => void,
  currentSearchStats: CurrentSearchStats,
|};

type State = {|
  isPopupOpen: boolean,
|};

class PriceFilter extends React.Component<Props, State> {
  state = {
    isPopupOpen: false,
  };

  handlePopupToggle = () =>
    this.setState(state => ({
      isPopupOpen: !state.isPopupOpen,
    }));

  handleSave = ({
    minPrice,
    maxPrice,
  }: {
    minPrice: number,
    maxPrice: number,
  }) => {
    const filter = {
      minPrice: minPrice !== MIN_PRICE ? minPrice : null,
      maxPrice:
        maxPrice !== this.props.currentSearchStats.priceMax ? maxPrice : null,
    };
    this.props.onChange(filter);
  };

  getTitle = (
    start: number,
    end: number,
    min: number,
    max: number,
    currency: string,
  ) => {
    if (start === min && end === max) {
      return 'price';
    }
    if (start === min) {
      return `< ${end} ${currency}`;
    }
    if (end === max) {
      return `> ${start} ${currency}`;
    }
    return `${start} - ${end} ${currency}`;
  };

  render() {
    const min = MIN_PRICE;
    const max = this.props.currentSearchStats.priceMax;
    const start = this.props.start || min;
    const end = this.props.end || max;
    const currency = this.props.currency;
    return (
      <View>
        <FilterButton
          title={this.getTitle(start, end, min, max, currency)}
          icon={{ name: 'attach-money', color: '#fff' }}
          isActive={min !== start || max !== end}
          onPress={this.handlePopupToggle}
        />
        <PricePopup
          isVisible={this.state.isPopupOpen}
          onClose={this.handlePopupToggle}
          onSave={this.handleSave}
          min={min}
          max={max}
          start={start}
          end={end}
          currency={currency}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentSearchStats: state.hotels.currentSearchStats,
});

export default connect(mapStateToProps)(PriceFilter);

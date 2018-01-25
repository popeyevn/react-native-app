// @flow

import * as React from 'react';
import { View } from 'react-native';
import { connect } from '@kiwicom/react-native-app-redux';

import PricePopup from './PricePopup';
import FilterButton from '../FilterButton';
import type {
  OnChangeFilterParams,
  PriceRanges,
} from '../FilterParametersType';
import type { HotelsReducerState } from '../../HotelsReducer';

export const MIN_PRICE = 0;
export const MAX_PRICE = 300;

type StateProps = {|
  priceRanges: PriceRanges,
|};

type ComponentProps = {|
  start: number | null,
  end: number | null,
  currency: string,
  onChange: OnChangeFilterParams => void,
|};

type Props = ComponentProps & StateProps;

type State = {|
  isPopupOpen: boolean,
|};

export class PriceFilter extends React.Component<Props, State> {
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
    const { min, max } = this.getRanges();
    const filter = {
      minPrice: minPrice !== min ? minPrice : null,
      maxPrice: maxPrice !== max ? maxPrice : null,
    };
    this.props.onChange(filter);
  };

  getRanges = () => {
    const priceRanges = this.props.priceRanges;
    const min = priceRanges.priceMin || MIN_PRICE;
    const max = priceRanges.priceMax || MAX_PRICE;

    return { min, max };
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
    const { min, max } = this.getRanges();
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

const select = ({ hotels }: { hotels: HotelsReducerState }): StateProps => ({
  priceRanges: hotels.priceRanges,
});

export default connect(select)(PriceFilter);

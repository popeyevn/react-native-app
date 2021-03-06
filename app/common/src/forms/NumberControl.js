// @flow

import * as React from 'react';
import { Icon } from '@kiwicom/react-native-app-common';
import { View, StyleSheet, Text } from 'react-native';

import IncrementDecrementButtons from '../buttons/IncrementDecrementButtons';

type Props = {|
  label: string,
  number: number,
  min?: number,
  max?: number,
  style?: Object,
  icon?: string,
  onChange: (number: number) => void,
|};

export default class NumberControl extends React.Component<Props> {
  handleIncrement = () => this.props.onChange(this.props.number + 1);

  handleDecrement = () => this.props.onChange(this.props.number - 1);

  render = () => (
    <View style={[styles.control, this.props.style]}>
      {this.props.icon && (
        <Icon name={this.props.icon} size={20} style={styles.icon} />
      )}
      <Text style={styles.label}>{this.props.label}</Text>
      <Text style={styles.number}>{this.props.number}</Text>
      <IncrementDecrementButtons
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
        number={this.props.number}
        min={this.props.min}
        max={this.props.max}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    flex: 4,
  },
  number: {
    flex: 1,
    marginRight: 20,
    textAlign: 'right',
  },
});

// @flow

/**
 * This module will be replaced by code that calls native modules when native
 * guys provides us native code This code can be used as a mock later Example
 * of use:
 *
 * ```
 * import { CurrencyFormatter } from '@kiwicom/react-native-app-common';
 *
 * CurrencyFormatter(250);
 * ```
 *
 * See also in https://confluence.kiwi.com/display/MOB/Semi+native+hotels#Seminativehotels-Currencyratesandformatters
 */
export default function CurrencyFormatter(price: number) {
  return price.toString();
}

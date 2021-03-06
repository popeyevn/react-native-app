// @flow

import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});

export default function StretchedImage(props: Object) {
  return <Image {...props} resizeMode="stretch" style={styles.image} />;
}

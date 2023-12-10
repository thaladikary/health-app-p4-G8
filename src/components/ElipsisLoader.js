import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function EllipsisLoader () {
  const loaderAnimation = new Animated.Value(0);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(loaderAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false,
        }),
        Animated.timing(loaderAnimation, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  const ellipsisStyles = {
    transform: [
      {
        scale: loaderAnimation,
      },
    ],
  };

  return (
    <View style={styles.ldsEllipsis}>
      <Animated.View style={[styles.ellipsisChild, styles.ellipsis1, ellipsisStyles]} />
      <Animated.View style={[styles.ellipsisChild, styles.ellipsis2, ellipsisStyles]} />
      <Animated.View style={[styles.ellipsisChild, styles.ellipsis2, ellipsisStyles]} />
      <Animated.View style={[styles.ellipsisChild, styles.ellipsis3, ellipsisStyles]} />
    </View>
  );
};

const styles = StyleSheet.create({
  ldsEllipsis: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
  },
  ellipsisChild: {
    position: 'absolute',
    width: 13,
    height: 13,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  ellipsis1: {
    left: 8,
  },
  ellipsis2: {
    left: 32,
  },
  ellipsis3: {
    left: 56,
  },
});


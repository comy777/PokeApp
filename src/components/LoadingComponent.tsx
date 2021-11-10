import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size={50} color="#5056D6" />
      <Text>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComponent;

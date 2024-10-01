import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type KeyboardScrollViewProps = {
  children: ReactNode;
};

const KeyboardScrollView = ({ children }: KeyboardScrollViewProps) => {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.scrollView}
      scrollEnabled>
      {children}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
});

export default KeyboardScrollView;

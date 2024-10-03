import CustomText from '@/components/Common/CustomText';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Splash = () => {
  return (
    <>
      <SafeAreaView>
        <CustomText>Splash</CustomText>
        <ActivityIndicator />
      </SafeAreaView>

      {/* <Modal>
        <View>
          <View style={styles.popup}>
            <Text>popup</Text>
          </View>
        </View>
      </Modal> */}
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  popup: {
    height: 300,
    marginHorizontal: 40,
    backgroundColor: '#fff',
  },
});

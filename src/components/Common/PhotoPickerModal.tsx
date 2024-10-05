import React, {useState} from 'react';
import {
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import CustomText from '@components/Common/CustomText.tsx';

// @ts-ignore
const PhotoPickerModal = ({
  modalVisible,
  setModalVisible,
  // @ts-ignore
  setSearchImage,
}) => {
  const openCamera = async () => {
    try {
      const options = {
        mediaType: 'photo',
        saveToPhotos: true,
      };
      // @ts-ignore
      const [result] = await Promise.all([launchCamera(options)]);
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('오류 발생', result.errorMessage);
      } else {
        // @ts-ignore
        setSearchImage(result.assets[0]);
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Camera launch failed: ', error);
      Alert.alert('오류 발생', '카메라를 여는 중 문제가 발생했습니다.');
    }
  };

  const openGallery = async () => {
    try {
      const options = {
        mediaType: 'photo',
      };

      const result = await launchImageLibrary(options as ImageLibraryOptions);
      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('오류 발생', result.errorMessage);
      } else {
        // @ts-ignore
        setSearchImage(result.assets[0]);
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Gallery launch failed: ', error);
      Alert.alert('오류 발생', '갤러리를 여는 중 문제가 발생했습니다.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={openCamera} style={styles.optionButton}>
            <CustomText style={styles.optionText}>카메라</CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery} style={styles.optionButton}>
            <CustomText style={styles.optionText}>갤러리</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.optionButton}>
            <CustomText style={styles.optionText}>취소</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
  },
});

export default PhotoPickerModal;

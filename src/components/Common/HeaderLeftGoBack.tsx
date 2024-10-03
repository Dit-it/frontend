import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Pressable, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/screens/navigationTypes';

// Props 타입 정의
type HeaderLeftGoBackProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const HeaderLeftGoBack: React.FC<HeaderLeftGoBackProps> = ({navigation}) => {
  return (
    <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
      {({pressed}) => (
        <View style={[styles.iconContainer, pressed && styles.pressed]}>
          <Icon size={30} name="chevron-back" color="rgba(0,0,0,0.9)" />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    opacity: 1,
  },
  pressed: {
    opacity: 0.55,
  },
});

export default HeaderLeftGoBack;

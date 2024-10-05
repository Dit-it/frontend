import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import CustomText from '../Common/CustomText';
import color from '@/constant/color';

const trashItems = [
  {id: '1', name: '부표류', description: '스티로폼, 인증, 플라스틱 부표 등'},
  {id: '2', name: '부표류', description: '스티로폼, 인증, 플라스틱 부표 등'},
  {id: '3', name: '부표류', description: '스티로폼, 인증, 플라스틱 부표 등'},
  {id: '4', name: '부표류', description: '스티로폼, 인증, 플라스틱 부표 등'},
  {id: '5', name: '부표류', description: '스티로폼, 인증, 플라스틱 부표 등'},
];

const TrashListItem = () => {

  const fetchTrashListItem = async () => {
    return await (await fetch('https://www.didit.store/api/v1/litter')).json();
  }

  useEffect(() => {
    fetchTrashListItem().then(
        data => {
          console.log('trashListItem: ', data);
        }
    )
  }, []);

  return (
    <View style={styles.container}>
      {trashItems.map((item, index) => (
        <View
          key={item.id}
          style={[
            styles.item,
            index === trashItems.length - 1 && styles.lastItem,
          ]}>
          <View>
            <Image source={require('@assets/icon/dummy_icon.png')} />
            <CustomText>{item.name}</CustomText>
          </View>
          <CustomText>{item.description}</CustomText>
        </View>
      ))}
    </View>
  );
};

export default TrashListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  item: {
    width: '49%',
    backgroundColor: color.gray100,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  lastItem: {
    marginBottom: 80,
  },
});

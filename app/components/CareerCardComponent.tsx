import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-paper';

interface Props {
  img: any;
  width: number;
  height: number;
  title: string;
  subTitle: string;
  topTitleOverLay: number;
}

export default function CareerCardComponent({
  img,
  width,
  height,
  title,
  subTitle,
  topTitleOverLay
}: Props) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Card>
        <Card.Cover source={img} style={[styles.career, { width, height }]} />
        <View style={[styles.textOverlay, { top: topTitleOverLay }]}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.textSubTitle}>{subTitle}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  career: {},
  textOverlay: {
    position: 'absolute',
    marginLeft: 20,
  },
  textTitle: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  textSubTitle: {
    fontSize: 18,
    color: 'white',
  },
  textInfo: {
    fontSize: 16,
    color: 'white',
  },
});

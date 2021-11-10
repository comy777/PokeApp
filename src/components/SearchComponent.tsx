import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useDebounce from '../hooks/useDebounce';

interface Props {
  style?: StyleProp<ViewStyle>;
  onDebounce: (value: string) => void;
}

const SearchComponent = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('');
  const {value} = useDebounce(textValue);
  useEffect(() => {
    onDebounce(value);
  }, [value]);
  return (
    <View style={{...styles.container, ...(style as any)}}>
      <View style={styles.textBG}>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon name="search-outline" color="grey" size={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textBG: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 18,
    top: 2,
  },
});

export default SearchComponent;

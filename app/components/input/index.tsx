import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
type UserInputParams = {
  placeholder: string;
  value: string;
  leftIconName: string;
  isRightIcon?: boolean;
  rightIconName?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  iconRightPress?: () => void;
  autoCompleteType?: 'email' | 'new-password' | 'current-password' | 'off';
  keyboardType?: 'email-address' | 'default' | undefined;
  secureTextEntry?: boolean;
  isBordered?: boolean;
};
export default ({
  placeholder,
  value,
  setValue,
  keyboardType = 'default',
  secureTextEntry = false,
  iconRightPress,
  leftIconName,
  isRightIcon = false,
  rightIconName = '',
  autoCompleteType = 'off',
}: UserInputParams) => {
  return (
    <View style={styles.inputContainer}>
      <Icon name={leftIconName} size={20} color="gray" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={text => setValue(text)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoComplete={autoCompleteType}
      />
      {isRightIcon ? (
        <TouchableOpacity onPress={iconRightPress} style={styles.icon}>
          <Icon name={rightIconName} size={20} color="gray" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#84878A',
    marginBottom: responsiveHeight(0.75),
  },
  icon: {
    marginHorizontal: responsiveWidth(2.5),
  },
  input: {
    flex: 1,
    paddingVertical: responsiveHeight(1.25),
  },
});

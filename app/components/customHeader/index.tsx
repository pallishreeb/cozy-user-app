import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';

interface CustomHeaderProps {
  title?: string; // title is optional
  onBackPress: () => void;
  onNotificationPress?: () => void;
  isNotification: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onBackPress,
  onNotificationPress,
  isNotification = false,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="arrow-back" size={rf(2.5)} color="#FFF" />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
      {isNotification && (
        <TouchableOpacity onPress={onNotificationPress}>
          <Icon name="notifications" size={rf(2.5)} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF3131',
    paddingHorizontal: 15,
    paddingVertical: 15,
  } as ViewStyle,
  title: {
    color: '#FFF',
    fontSize: rf(2.2),
    fontWeight: 'bold',
  } as TextStyle,
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
interface Day {
  name: string;
  isEnabled: boolean;
  from: Date | null;
  to: Date | null;
}

export const WorkingHours = ({days}: {days: Day[]}) => {
  return (
    <View>
      {days.map(day => (
        <View key={day.name} style={styles.dayRow}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.dayName}>{day.name}</Text>
          </View>

          {day.isEnabled ? (
            <>
              <Text style={styles.timePickerBox}>
                From: {day.from ? format(day.from, 'p') : 'Not Known'}
              </Text>
              <Text style={styles.timePickerBox}>
                To: {day.to ? format(day.to, 'p') : 'Not Known'}
              </Text>
            </>
          ) : (
            <View style={[styles.timePickerBox, styles.closedBox]}>
              <Text style={styles.closedText}>Closed</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: rw(3),
    marginVertical: rh(1.25),
    flexWrap: 'nowrap',
  },
  dayName: {
    marginRight: rw(2.5),
    fontWeight: 'bold',
    color: '#000',
    fontSize: rf(2),
  },
  timePickerBox: {
    borderWidth: rw(0.25),
    borderColor: '#ccc',
    paddingVertical: rh(1),
    paddingHorizontal: rw(4),
    borderRadius: rw(1.25),
    minWidth: rw(38),
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000',
  },
  closedBox: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
  },
  closedText: {
    color: 'gray',
    fontWeight: '600',
    textTransform: 'capitalize',
    fontSize: rf(2),
  },
});

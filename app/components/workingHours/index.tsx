import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {format} from 'date-fns';
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

const {width} = Dimensions.get('window');
const rw = (percentage: number) => (width * percentage) / 100;

const styles = StyleSheet.create({
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: rw(3),
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  dayName: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  timePickerBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    minWidth: rw(38),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closedBox: {
    backgroundColor: '#D3D3D3',
  },
  closedText: {
    color: 'gray',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

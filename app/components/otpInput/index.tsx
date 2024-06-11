import React from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
export default ({
  setCurrentOtp,
}: {
  setCurrentOtp: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <OtpInput
      autoFocus
      numberOfDigits={6}
      focusColor="#FF3131"
      focusStickBlinkingDuration={500}
      onTextChange={text => setCurrentOtp(text)}
      onFilled={text => setCurrentOtp(text)}
      theme={{
        containerStyle: {
          marginVertical: rh(3),
          width: rw(90),
        },
        inputsContainerStyle: {},
        pinCodeContainerStyle: {
          height: rh(5.5),
          width: rw(14),
          borderRadius: rf(0.5),
          borderWidth: rf(0.1),
        },
      }}
    />
  );
};

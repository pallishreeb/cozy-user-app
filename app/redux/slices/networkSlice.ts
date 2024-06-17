import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import NetInfo from '@react-native-community/netinfo';
import {AppThunk} from '../store';

interface NetworkState {
  isConnected: boolean;
}

const initialState: NetworkState = {
  isConnected: true,
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setNetworkStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const {setNetworkStatus} = networkSlice.actions;

export const monitorNetworkStatus = (): AppThunk => dispatch => {
  NetInfo.addEventListener(state => {
    dispatch(setNetworkStatus(state.isConnected as boolean));
  });
};

export default networkSlice.reducer;

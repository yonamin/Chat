import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    activeModal: { type: null, item: null },
    // defaultChannelId: 1,
    activeChannelId: '1',
    // channelNames: [],
  },
  reducers: {
    setActiveModal: (state, { payload: modal }) => {
      /* eslint-disable no-param-reassign */
      state.activeModal = modal;
    },
    setActiveChannelId: (state, { payload: { id } }) => {
      state.activeChannelId = id;
    },
    // setDefaultChannelId: (state, { payload: { defaultChannelId } }) => {
    //   state.defaultChannelId = defaultChannelId;
    // },
    // addChannelName: (state, { payload: { channelName } }) => {
    //   state.channelNames = [...state.channelNames, channelName];
    // },
  },
});

export const {
  setActiveChannelId,
  setActiveModal,
  // setDefaultChannel,
  // addChannelName,
} = uiSlice.actions;

export default uiSlice.reducer;

export const selectActiveChannelId = (state) => state.ui.activeChannelId;
export const selectActiveModal = (state) => state.ui.activeModal;
// export const selectDefaultChannel = (state) => state.ui.defaultChannelId;
// export const selectChannelNames = (state) => state.ui.channelNames;

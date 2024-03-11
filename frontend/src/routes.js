const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  channelPath: (channelId) => [apiPath, 'channels', channelId].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  messagePath: (messageId) => [apiPath, 'messages', messageId].join('/'),
};

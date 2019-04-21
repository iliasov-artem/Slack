const api = 'api/v1';

export const messages = channelId => `${api}/channels/${channelId}/messages`;
export const channels = () => `${api}/channels`;

const path = 'https://zurich.kosyachniy.com/';

const api = {
  data(time, emoji, geo) {
    const config = {
      time,
      emoji,
      geo,
    };
    return fetch(path, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(config),
    });
  },
};

export const data = async (time, emoji, geo) => {
  try {
    const response = await api.data(time, emoji, geo);
    console.log('TCL: data -> response', response);
    if (response.ok) {
      const responseJson = await response.json();
      console.log('TCL: getData -> responseJson', responseJson);
      return responseJson;
    }
    return [];
  } catch {
    return [];
  }
};

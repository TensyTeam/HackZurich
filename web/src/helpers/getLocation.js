const technopark = {
  lat: 47.390295,
  lng: 8.515839,
};

export function getLocation(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: { latitude: lat, longitude: lng },
        } = position;

        cb({ lat, lng });
      },
      () => cb(technopark)
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    cb(technopark);
  }
}

export default function healthCheck() {
  return new Promise((resolve) => {
    resolve({
      status: 'Service is up and running'
    });
  });
}

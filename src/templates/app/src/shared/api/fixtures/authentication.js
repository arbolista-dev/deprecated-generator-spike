export const login = ({username, password})=>{
  return Promise.resolve({
    user: {
      email: `${username}@example.com`,
      username
    },
    token: '1234567890'
  });
}
export const login = (token) => {
  return Promise.resolve();
}

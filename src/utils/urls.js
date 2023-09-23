

let apiVersion = process.env.REACT_APP_API_URL;

export const getUserListApiUrl = `${apiVersion}/user/getUserList`;
export const addUserAPIUrl = `${apiVersion}/user/addUser`;
export const updateUserAPIUrl = `${apiVersion}/user/updateUser`;
export const deleteUserAPIUrl = `${apiVersion}/user/deleteUser`;



let apiVersion = process.env.REACT_APP_API_URL;

export const getMovieListApiUrl = `${apiVersion}/movie/getMovieList`;
export const addMovieAPIUrl = `${apiVersion}/movie/addMovie`;
export const updateMovieAPIUrl = `${apiVersion}/movie/updateUser`;
export const deleteMovieAPIUrl = `${apiVersion}/movie/deleteMovie`;

export const addUserAPIUrl = `${apiVersion}/user/addUser`;

export const signInAPIUrl = `${apiVersion}/auth`;

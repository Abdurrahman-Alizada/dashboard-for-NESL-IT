import axios from 'axios';

const url = 'http://localhost:8000';

// get order about a user
export const getAllDonies = async (id) => {
  try {
    return await axios.get(`${url}/api/post/allposts`);
  } catch (error) {
    return error;
  }
};

export const getAllRegisterDonors = async () => {
  try {
    return await axios.get(`${url}/api/users/allusers`);
  } catch (error) {
    return error;
  }
};

// GetDonationPostsOfDonor
export const getAllPosts = async (id) => {
  try {
    return await axios.get(`${url}/api/users/donation/${id}`);
  } catch (error) {
    return error;
  }
};

export const getAllDonorNumber = async (id) => {
  try {
    return await axios.get(`${url}/api/users/getAllDonorNumber`);
  } catch (error) {
    return error;
  }
};

export const getAllDoneeNumber = async (id) => {
  try {
    return await axios.get(`${url}/api/users/getAllDoneeNumber`);
  } catch (error) {
    return error;
  }
};

export const getDonorPostDetails = async (id) => {
  console.log('donorPostDetail');
  try {
    return await axios.get(`${url}/api/users/donorPostDetail/${id}`);
  } catch (error) {
    return error;
  }
};
// get order about a user
export const getOrderAboutUser = async (id) => {
  try {
    return await axios.get(`${url}/api/orderManipulate/find/${id}`);
  } catch (error) {
    return error;
  }
};

// verify dhobie account
export const updateRecentDhobieStatus = async (status, id) => {
  try {
    // console.log(status);
    // console.log(id);
    return await axios.post(`${url}/api/adminAuth/ApproveDhobie/${id}`, { status });
  } catch (error) {
    return error;
  }
};

// delete multiple DohbieUser
export const FetchRecentDhobies = async () => {
  try {
    return await axios.get(`${url}/api/adminAuth/fetchAllRecentDhobies`);
  } catch (error) {
    return error;
  }
};

// delete multiple DohbieUser
export const deleteMulDhobieUser = async (data) => {
  try {
    return await axios.post(`${url}/api/adminAuth/delMulAdminDhobie`, { arrayUser: data });
  } catch (error) {
    return error;
  }
};

// update register dhobieUsers
export const updateDhobieUsers = async (id, data) => {
  try {
    return await axios.put(`${url}/api/adminAuth/update/${id}`, data);
  } catch (error) {
    return error;
  }
};

// delete DhobieAdmin from db
export const deleteDhobiUser = async (id) => {
  try {
    return await axios.delete(`${url}/api/adminAuth/delete/${id}`);
  } catch (error) {
    return error;
  }
};

// get all register usersDhobie
export const getAllDhobieUser = async () => {
  try {
    return await axios.get(`${url}/api/adminAuth/find`);
  } catch (error) {
    return error;
  }
};

// delete multiple DohbieUser
export const deleteMulUsers = async (data) => {
  try {
    return await axios.post(`${url}/api/userAuth/deleteMultipleUser`, { arrayUser: data });
  } catch (error) {
    return error;
  }
};

// update register users
export const updateUser = async (id, data) => {
  try {
    return await axios.put(`${url}/api/userAuth/update/${id}`, data);
  } catch (error) {
    return error;
  }
};

// delte user from db
export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${url}/api/userAuth/delete/${id}`);
  } catch (error) {
    return error;
  }
};

// get all register users
export const getAllUsers = async () => {
  try {
    return await axios.get(`${url}/api/userAuth/find`);
  } catch (error) {
    return error;
  }
};

// get all feedbackes
export const getTotalFeedback = async () => {
  try {
    return await axios.get(`${url}/api/feedback/get`);
  } catch (error) {
    return error;
  }
};

// get all pending orders
export const getTotalPendingOrder = async () => {
  try {
    return await axios.get(`${url}/api/orderManipulate/pendingOrder`);
  } catch (error) {
    return error;
  }
};

// get all orders
export const getTotalOrder = async () => {
  try {
    return await axios.get(`${url}/api/orderManipulate/totalOrder`);
  } catch (error) {
    return error;
  }
};

// get count register AdminDobies
export const getRegisterDhobies = async () => {
  try {
    return await axios.get(`${url}/api/adminAuth/getTotalDhobies`);
  } catch (error) {
    return error;
  }
};

// get count register users
export const getRegisterCustomer = async () => {
  try {
    return await axios.get(`${url}/api/userAuth/totalUser`);
  } catch (error) {
    return error;
  }
};

// post users
export const registration = async (data) => {
  try {
    return await axios.post(`${url}/api/userAuth/register`, data);
  } catch (error) {
    return error;

    // To get the data message from the api

    // return error.response.data.message;
    // User already exist in this email
    // return error.response.message;
  }
};

// login users
export const login = async (data) => {
  try {
    return await axios.post(`${url}/api/userAuth/login/owner`, data);
  } catch (error) {
    return error;
  }
};

// post to confirm email
export const confirmEmail = async (id, token) => {
  try {
    return await axios.post(`${url}/api/userAuth/new__password/:${id}/:${token}`);
  } catch (error) {
    return error;
  }
};

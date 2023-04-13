const axios = require('axios');
const { failure } = require('../utils/CONSTANTS');
require('dotenv').config();
const port = process.env.PORT;
const listifyRoute = `http://localhost:${port}/listify`;

describe('User SignUp Tests', () => {
  test('New user on correct credentials', async () => {
    const req = {
      body: {
        emailId: "user142wqerql@gmail.com",
        username: "user",
        password: "password"
      }
    };
    try {
      let response = await axios.post(`${listifyRoute}/signUp`, req.body);
      expect(response.status).toBe(201);
      expect(response.message).toEqual("User Signed up !");
      expect(response.data).toEqual("");
    } catch (err) { }
  });

  test('New user on Incorrect credentials syntax', async () => {
    const req = {
      body: {
        emailId: "user17998",
        username: "user78"
      }
    };
    try {
      let response = await axios.post(`${listifyRoute}/signUp`, req.body);
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data).toEqual("emailId,username,password are not valid !");
      //In axios---> err.message: 'Request failed with status code 400', data is your message
    }
  });

  test('User who already signedUp', async () => {
    const req = {
      body: {
        emailId: "user9@gmail.com",
        username: "user",
        password: "password"
      }
    };
    try {
      let response = await axios.post(`${listifyRoute}/signUp`, req.body);
    } catch (err) {
      expect(err.response.status).toBe(409);
      expect(err.response.data).toEqual(failure.USER_ALREADY_PRESENT);
    }
  });

})


describe('User Login Tests', () => {
  test('User on correct credentials', async () => {
    const req = {
      body: {
        emailId: "user9@gmail.com",
        password: "password"
      }
    };
    try {
      let response = await axios.post(`${listifyRoute}/login`, req.body);
      expect(response.status).toBe(200);
      expect(response.data.token && typeof response.data === 'object').toBe(true);
    } catch (err) {
      expect(err.response.status).toBe(500);
      expect(err.response.data).toEqual(failure.SERVER_ERROR);
    }
  });


  test('User on Incorrect credentials', async () => {
    const req = {
      body: {
        emailId: "user9@gmail.com",
        password: "passwordsegs"
      }
    };
    try {
      let response = await axios.post(`${listifyRoute}/login`, req.body);
    } catch (err) {
      expect(err.response.status).toBe(401);
      expect(err.response.data).toEqual(failure.UNAUTHORISED_ACCESS);
    }
  });


  test('New user trying to login', async () => {
    const req = {
      body: {
        emailId: "user92@gmail.com",
        password: "password"
      }
    };
    try {
      let response = await axios.post(`${listifyRoute}/login`, req.body);
    } catch (err) {
      expect(err.response.status).toBe(401);
      expect(err.response.data).toEqual(failure.USER_NOT_FOUND);
    }
  });
});


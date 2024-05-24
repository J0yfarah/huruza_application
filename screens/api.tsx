import axios from 'axios';

//const API_BASE_URL = 'http://192.168.1.102/backend_hurudza';
const API_BASE_URL = 'http://10.42.0.34/backend_hurudza';
//const API_BASE_URL = 'http://192.168.43.171/backend_hurudza';

export const loginUser = async (farmer_id: any, farmer_password: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login.php`, {
        farmer_id,
        farmer_password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  export const signupUser = async (userData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup.php`, userData, {

            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// Add more functions for other API endpoints as needed
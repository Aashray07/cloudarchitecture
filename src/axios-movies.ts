import axios from 'axios';

// Create an asynchronous function to retrieve the API key from Parameter Store
const getApiKey = async () => {
  try {
    const response = await axios.get(
      'https://ssm.us-east-1.amazonaws.com/latest/parameter/apikeyformoviedb',
      {
        headers: {
          'X-aws-ec2-metadata-token': 'required',
        },
      }
    );

    // Access the API key from the response
    const apiKey = response.data.Parameter.Value;
    console.log(apiKey);
    return apiKey;
  } catch (error) {
    console.error('Error fetching API key from Parameter Store:', error);
    throw error;
  }
};

// Create an Axios instance with the retrieved API key
const createAxiosInstance = async () => {
  const apiKey = await getApiKey();

  // Create Axios instance with the API key
  const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: apiKey,
    },
  });

  return instance;
};

// Export the function to create Axios instance
export default createAxiosInstance;

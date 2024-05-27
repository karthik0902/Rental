import axios from 'axios';

const baseURL = 'http://localhost:3002';

export const BuyerLogin = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/buyerUsers/login`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const BuyerSignup = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/buyerUsers/signup`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const SellerLogin = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/sellerUsers/login`,data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  export const SellerSignup = async (data) => {
      try {
        const response = await axios.post(`${baseURL}/sellerUsers/signup`,data);
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    export const SellerPostAd = async (id,data,token) => {
      try {
        const response = await axios.post(`${baseURL}/sellerUsers/${id}/ads`,data,{
          headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}` 
          }},);
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    export const getSellerAd = async (id,token) => {
      try {
        const response = await axios.get(`${baseURL}/sellerUsers/${id}`,{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };
    export const GetBuyer = async (token) => {
      try {
        const response = await axios.get(`${baseURL}/buyerUsers/`,{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };


    export const BuyerAsc = async (token) => {
      try {
        const response = await axios.get(`${baseURL}/buyerUsers/asc`,{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };
    export const BuyerDsc = async (token) => {
      try {
        const response = await axios.get(`${baseURL}/buyerUsers/dsc`,{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    export const Buyerfilterprice = async (min,max,token) => {
      try {
        const response = await axios.get(`${baseURL}/buyerUsers/price/${min}/${max}`,{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };


    export const SellerInterested = async (id,token) => {
      try {
        const response = await axios.get(`${baseURL}/sellerUsers/Interested/${id}`,{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    export const SellerputAd = async (adid,id,data,token) => {
      try {
        const response = await axios.put(`${baseURL}/sellerUsers/${adid}/adds/${id}`,data,{
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}` 
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };


    export const Sellerdeletead = async (adid,id,token) => {
      try {
        const response = await axios.delete(`${baseURL}/sellerUsers/${adid}/adds/${id}`,{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };

    export const buyerInterested = async (BuyerID,id,token) => {
      try {
        const response = await axios.post(`${baseURL}/buyerUsers/Interested/${BuyerID}`,{id},{
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        return response;
      } catch (error) {
        throw error;
      }
    };


    

      
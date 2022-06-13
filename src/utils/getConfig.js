const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  
export default getConfig;
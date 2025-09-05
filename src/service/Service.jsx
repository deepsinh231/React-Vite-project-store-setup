const setUserdata = (userdata) => {
  try {
    return localStorage.setItem("userdata", JSON.stringify(userdata));
  } catch (error) {
    console.error(error);
    return null;
  }
};

const Service = {
  setUserdata,
  getUserdata: () => {
    try {
      return JSON.parse(localStorage.getItem("userdata"));
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  removeUserdata: () => {
    try {
      return localStorage.removeItem("userdata");
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
export default Service;

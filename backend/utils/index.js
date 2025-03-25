const handleErr = (err) => {
  console.log("ERROR CAUGHT", err);
  return {
    data: null,
    error: true,
    message: err,
  };
};

export default handleErr;

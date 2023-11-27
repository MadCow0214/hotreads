export const checkAuthenticated = (req, flag) => {
  if (Boolean(req.user) !== flag) {
    throw Error(`You need to log ${flag ? "in" : "out"} to perform this action`);
  }

  return;
};

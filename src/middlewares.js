export const checkAuthenticated = (request, flag) => {
  if (Boolean(request.user) !== flag) {
    throw Error(`You need to log ${flag ? "in" : "out"} to perform this action`);
  }

  return;
};

const sendToken = (statusCode, message = "",  user, res) => {
  const token = user.generateJWTToken();

  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),

    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message : message,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
};

export default sendToken;

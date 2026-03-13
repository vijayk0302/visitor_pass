export const preventadmin = (req, res, next) => {
  const { role } = req.body;

  if (role === "admin") {
    return res.status(403).json({
      msg: "Admin is not allowed to create another admin",
    });
  }
  next()
};

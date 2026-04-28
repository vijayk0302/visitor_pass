export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: "Please login",
      });
    }

    const userRole=req.user.role;

    if(!userRole){
      return res.status(403).json({
        success: false,
        msg: "user role is not defined",
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        msg: "You do not have permission to access this resource",
      });
    }
    next();
  };
};

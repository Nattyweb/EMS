
function verifyAdmin(req, res, next) { 
  if(req.user.employeeStaus != admin) { 
    return res.status(403).send("access Denied"); 
  }
  next();
}
module.exports = verifyAdmin
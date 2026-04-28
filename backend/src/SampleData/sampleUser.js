import bcrypt from "bcryptjs";
import { allIds } from "../../seedid.js";

const sampleUsers = async () => {
  const adminpwd = await bcrypt.hash("Admin@123#", 10);
  const employeepwd = await bcrypt.hash("employee@123#", 10);
  const securitypwd = await bcrypt.hash("security@123#", 10);
  const visitorpwd = await bcrypt.hash("visitor@123#", 10);
  
  return [
  {
    _id: allIds.admin,
    name: "admin",
    email: "admin@test.com",
    password: adminpwd,
    role: "admin",
    status: "active",
    isverified: true,
  },
  {
    _id: allIds.employee,
    name: "employee",
    email: "employee@test.com",
    password: employeepwd,
    role: "employee",
    status: "active",
    isverified: true,
  },
  {
    _id: allIds.security,
    name: "security",
    email: "security@test.com",
    password: securitypwd,
    role: "security",
    status: "active",
    isverified: true,
  },
  {
    _id: allIds.visitor,
    name: "visitor",
    email: "visitor@test.com",
    password: visitorpwd,
    role: "visitor",
    status: "active",
    isverified: true,
  },
];
};

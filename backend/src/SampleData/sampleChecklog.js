import { allIds } from "../../seedid.js";

export const sampleCheckLog = [
  {
    _id: allIds.checklog1,
    pass: allIds.pass1,
    checkInTime: new Date(),
    checkOutTime: new Date(),
    checkedInBy: allIds.security,
  },
  {
    _id: allIds.checklog2,
    pass: allIds.pass2,
    checkInTime: new Date(),
    checkOutTime: new Date(),
    checkedInBy: allIds.security,
  },
  {
    _id: allIds.checklog3,
    pass: allIds.pass3,
    checkInTime: new Date(),
    checkOutTime: new Date(),
    checkedInBy: allIds.security,
  },
];

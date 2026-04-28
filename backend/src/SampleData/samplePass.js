import { allIds } from "../../seedid.js";

export const samplePass = [
  {
    _id: allIds.pass1,
    appointment: allIds.appointment1,
    qrCode: "qrcode123",
    validFrom: new Date(),
    validTo: new Date(),
    status: "active",
    issuedBy: {
      id: allIds.employee,
      name: "employee",
    },
  },
  {
    _id: allIds.pass2,
    appointment: allIds.appointment1,
    qrCode: "qrcode123",
    validFrom: new Date(),
    validTo: new Date(),
    status: "used",
    issuedBy: {
      id: allIds.employee,
      name: "employee",
    },
  },
  {
    _id: allIds.pass3,
    appointment: allIds.appointment3,
    qrCode: "qrcode123",
    validFrom: new Date(),
    validTo: new Date(),
    status: "expired",
    issuedBy: {
      id: allIds.employee,
      name: "employee",
    },
  },
];

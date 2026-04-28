import { allIds } from "../../seedid.js";

export const sampleAppointment = [
  {
    _id:allIds.appointment1,
    visitor: allIds.visitor,
    phone: "9876543211",
    photo:
      "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg",
    idproof: "voter card",
    visitDate: "2026-04-18T00:00:00.000+00:00",
    purpose: "test",
    status: "approved",
    remark: "",
  },
  {
    _id:allIds.appointment2,
    visitor: allIds.visitor,
    phone: "987654321",
    photo:
      "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg",
    idproof: "aadhar card",
    visitDate: "2026-04-18T00:00:00.000+00:00",
    purpose: "test",
    status: "pending",
    remark: "",
  },
  {
    _id:allIds.appointment3,
    visitor: allIds.visitor,
    phone: "987654321",
    photo:
      "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192.jpg",
    idproof: "ration card",
    visitDate: "2026-04-18T00:00:00.000+00:00",
    purpose: "test",
    status: "rejected",
    remark: "not vaild photo",
  },
];

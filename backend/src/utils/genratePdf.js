import PDFDocument from "pdfkit";

export const generatePdf = async (pass) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      
      doc
        .fontSize(22)
        .text("VISITOR PASS", { align: "center" })
        .moveDown(1.5);

      
      const startX = 50;
      const startY = 120;
      const boxWidth = 500;
      const boxHeight = 300;

      doc
        .rect(startX, startY, boxWidth, boxHeight)
        .stroke();

      
      const contentX = startX + 20;
      let contentY = startY + 20;

      const visitor = pass.appointment.visitor;

      doc.fontSize(12);

      const addField = (label, value) => {
        doc
          .font("Helvetica-Bold")
          .text(label, contentX, contentY);

        doc
          .font("Helvetica")
          .text(value || "-", contentX + 120, contentY);

        contentY += 25;
      };

      addField("Name:", visitor.name);
      addField("Email:", visitor.email);
      addField("Appointment ID:", pass.appointment._id.toString());

      addField(
        "Valid From:",
        new Date(pass.validFrom).toLocaleString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })
      );

      addField(
        "Valid To:",
        new Date(pass.validTo).toLocaleString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })
      );

      addField("Issued By:", pass.issuedBy?.name || "Admin");

      
      if (pass.qrCode) {
        const base64Data = pass.qrCode.replace(
          /^data:image\/png;base64,/,
          ""
        );
        const qrBuffer = Buffer.from(base64Data, "base64");

        doc.image(qrBuffer, startX + 330, startY + 40, {
          width: 120,
        });
      }

      doc
        .fontSize(10)
        .text(
          "This is just Acknowledgment slip you can view your pass by login in visi.co The pass details are given Above",
          startX,
          startY + boxHeight + 20,
          { width: boxWidth, align: "center" }
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
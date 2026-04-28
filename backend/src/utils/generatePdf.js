import PDFDocument from "pdfkit";


export const generatePdf = (pass) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
      });

      const chunks = [];
      
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      });

     
      doc.fontSize(20)
         .font("Helvetica-Bold") 
         .text("VISITOR PASS", { align: "center" });
      
      doc.moveDown(1); 

      doc.rect(50, 120, 500, 200).stroke();

      let currentY = 140;
      const labelX = 70;
      const valueX = 190;

      doc.fontSize(11); 

      
      const addRow = (label, value) => {
        doc.font("Helvetica-Bold").text(label, labelX, currentY);
        doc.font("Helvetica").text(String(value || "-"), valueX, currentY);
        currentY += 22; 
      };

      
      addRow("Name:", pass.appointment?.visitor?.name);
      addRow("Email:", pass.appointment?.visitor?.email);
      addRow("Appointment ID:", pass.appointment?._id);

      
      const dateOptions = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };

      addRow("Valid From:", new Date(pass.validFrom).toLocaleString("en-IN", dateOptions));
      addRow("Valid To:", new Date(pass.validTo).toLocaleString("en-IN", dateOptions));
      addRow("Issued By:", pass.issuedBy?.name || "Admin System");


      if (pass.qrCode) {
   
        const base64Data = pass.qrCode.includes("base64,") 
          ? pass.qrCode.split(",")[1] 
          : pass.qrCode;

        doc.image(Buffer.from(base64Data, "base64"), 380, 155, { 
          width: 110
        });
      }

      const footerY = 300;
      doc.fontSize(8)
         .text(
           "This is an acknowledgment slip. You can view your full pass by logging into visi.co. All details provided are verified via the appointment system.",
           50,
           footerY,
           {
             width: 500,
             align: "center",
             lineGap: 2
           }
         );

      doc.end();
    } catch (error) {
      console.error("PDF Generation Error:", error);
      reject(error);
    }
  });
};
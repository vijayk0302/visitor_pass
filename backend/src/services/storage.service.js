import ImageKit from "@imagekit/nodejs";

let imagekitClient;

const getImageKitClient = () => {
  if (!imagekitClient) {
    imagekitClient = new ImageKit({   
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    });
  }
  return imagekitClient;
};

export const uploadFile = async (file) => {
  const client = getImageKitClient();

  const res = await client.files.upload({
    file,
    fileName: `visitorPhoto_${Date.now()}`,
    folder: "visico/visitors",
  });

  return res;
};


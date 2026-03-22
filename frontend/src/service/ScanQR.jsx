import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import api from "../api/api";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function ScanQR() {
  const navigate = useNavigate()

  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: 250, fps: 5
    })

    scanner.render(async (decodedText) => {
      scanner.clear();

      try {

        const passId = decodedText.split("/").pop();

        const res = await api.post(
          `/api/checklogs/scanvisitor/${passId}`,
          {},
          {
            withCredentials: true
          }
        );

        toast.success(res.data.msg);

      } catch (err) {
        toast.error(err.response?.data?.msg || "Error");
      }

      navigate('/log')

    });

  }, [])


  return <div className="w-full text-white bg-[#111827] mt-20 sm:mt-0" id="reader"></div>;
}

export default ScanQR;
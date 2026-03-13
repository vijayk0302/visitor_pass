import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import api from "../api/api";
import { useNavigate } from 'react-router-dom';


function ScanQR() {
  const navigate = useNavigate()

  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: 250, fps: 5
    })

    scanner.render(async (decodedText) => {

      try {

        const passId = decodedText.split("/").pop();

        const res = await api.post(
          `/api/checklogs/scanvisitor/${passId}`,
          {},
          {
            withCredentials: true
          }
        );

        alert(res.data.msg);

      } catch (err) {
        alert(err.response?.data?.msg || "Error");
      }

      navigate('/log')

    });

  }, [])


  return <div id="reader"></div>;
}

export default ScanQR;
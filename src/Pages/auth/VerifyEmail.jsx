import { useState } from "react";
import api from "../../api/axios";

export default function VerifyEmail() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async () => {
    try {
      setLoading(true);
      const res = await api.post("/email/resend", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setMsg(res.data.message);
    } catch {
      setMsg("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full h-dvh flex justify-center items-center  "> 
    <div className="p-10 max-w-md mx-auto text-center border rounded">
      <h1 className="text-xl font-bold mb-2">Verify your email</h1>
      <p className="mb-4"> please Verify your email to continue</p>
      <button
        onClick={sendMail}
        disabled={loading}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        {loading ? "Sending..." : "Send Verification Email"}
      </button>

      {msg && <p className="mt-4 text-green-600">{msg}</p>}
    </div>
    </div> 
  );
}

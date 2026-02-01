

import { useSearchParams, Link } from "react-router-dom";

export default function EmailVerified() {
  const [params] = useSearchParams();
  const status = params.get("status"); // success | failed

  const isSuccess = status === "success";

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="p-10 max-w-md mx-auto text-center border rounded">
        {isSuccess ? (
          <>
            <h1 className="text-2xl font-bold mb-3 text-green-600">
              ✅ Email Verified
            </h1>
            <p className="mb-4">
              Your email has been verified successfully.
            </p>
            <Link
              to="/Login"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-3 text-red-600">
              ❌ Verification Failed
            </h1>
            <p className="mb-4">
              Verification link is invalid or already used.
            </p>
            <Link
              to="/VerifyEmail"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
              Resend Verification Email
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
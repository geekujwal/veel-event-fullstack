import React, { useState } from "react";
import Card from "../../components/ui/card/Card";
import axiosInstance from "../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Login() {
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const query = useQuery();

  const handleSubmit = () => {
    axiosInstance
      .post(`/user/login?code=${value}`)
      .then((res) => {
        localStorage.setItem("code", value);
        localStorage.setItem("votes", res.data.votes);
        toast.success("Login Successfull!");
        if (query.get("from")) {
          navigate(String(query.get("from")));
        } else {
          navigate("/tournament-bracket");
        }
      })
      .catch(() => {
        toast.error("Wrong code entered!");
      });
  };

  return (
    <section className="h-[calc(100vh-200px)] text-center padding-primary w-full flex items-center justify-center">
      <Card className="space-y-[24px]">
        <h3>Please enter the given code by the admin!</h3>
        <input
          type="text"
          className="w-full max-w-md p-3 border-2 border-gray-300 rounded-md transition duration-300 focus:outline-none focus:border-blue-500"
          value={value}
          onChange={handleChange}
          placeholder="Enter 5-digit code"
          maxLength={5}
        />
        <div>
          <button
            className=" bg-primaryBlue disabled:bg-primaryBlue/50 text-white w-full py-3 rounded-lg text-xl"
            onClick={handleSubmit}
            disabled={value === ""}
          >
            Login
          </button>
          <div className="text-xs mt-2 text-subText">
            Note: Ask admin if you haven't recieved one yet!
          </div>
        </div>
      </Card>
    </section>
  );
}

export default Login;

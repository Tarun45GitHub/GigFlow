import api from "../api/axios";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const submit = async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  try {
    const res = await api.post("/api/auth/login", data);

    console.log("LOGIN RESPONSE:", res.data);

    const user = res.data.user;
   


    if (!user || !user._id) {
      console.error(" User ID missing");
      alert("User ID missing from backend");
      return;
    }

    // 🔌 CONNECT SOCKET
    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Frontend socket connected:", socket.id);

      // 🔑 JOIN ROOM
      socket.emit("join", user._id);
      console.log("JOIN EVENT SENT:", user._id);
    });

    alert("Login successful");
    
    
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username",res.data.user.name)
    navigate("/");

  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};


  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Login
        </h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  );
}

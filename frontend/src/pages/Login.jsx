import api from "../api/axios";

export default function Login() {
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    await api.post("/api/auth/login", data);
    alert("Login successful");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Login</h2>

        <input name="email" placeholder="Email" className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" />

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  );
}

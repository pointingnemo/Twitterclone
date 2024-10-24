

'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);  
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/signup";
    const payload = isLogin
      ? { username: formData.username, password: formData.password }
      : {
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:'include',
        body: JSON.stringify(payload),
        
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      console.log("User data:", data);


      router.push("/");
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="w-full p-3 border rounded"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full p-3 border rounded"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 border rounded"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required={!isLogin}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-3 border rounded"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 ${
              isLogin ? "bg-blue-500" : "bg-green-500"
            } text-white rounded`}
            disabled={loading}
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="ml-2 text-blue-500 underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

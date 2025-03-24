import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface LoginData {
  username: string;
  password: string;
}

interface SignUpData extends LoginData {
  confirmPassword: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

interface FormData {
  username: string;
  password: string;
  location: Coordinates;
}

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData | LoginData>();

  useEffect(() => {
    document.title = isLogin ? "Login" : "Sign Up";
  }, [isLogin]);

  const getLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    });
  };

  const onSubmit: SubmitHandler<LoginData | SignUpData> = async (data) => {
    try {
      const position = await getLocation();
      const { latitude, longitude, accuracy } = position.coords;

      const formData: FormData = {
        username: data.username,
        password: data.password,
        location: { latitude, longitude, accuracy },
      };

      let url: string;
      if (isLogin) {
        url = `${import.meta.env.VITE_API_URL}/login`;
      } else {
        url = `${import.meta.env.VITE_API_URL}/register`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "user created successfully");
        if (isLogin) Cookies.set("jwt_token", data.token, { expires: 1 });
        navigate(isLogin ? "/" : "/login");
      } else {
        const error = await response.json();
        toast.error(error.message || "Something went wrong");
      }
    } catch (error) {
      console.warn("Geolocation error:", error);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <Toaster richColors />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label>Username</label>
              <Input
                {...register("username", { required: "Username is required" })}
                type="text"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label>Password</label>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="mb-3">
                <label>Confirm Password</label>
                <Input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  type="password"
                  placeholder="Confirm Password"
                />
                {(errors as FieldErrors<SignUpData>)?.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {
                      (errors as FieldErrors<SignUpData>)?.confirmPassword
                        ?.message
                    }
                  </p>
                )}
              </div>
            )}

            <Button
              className="mt-4 cursor-pointer w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link to={isLogin ? "/signup" : "/login"} className="text-blue-500">
              {isLogin ? "Sign up" : "Login"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Auth;

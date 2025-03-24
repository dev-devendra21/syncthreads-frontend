import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<
    {
      _id: string;
      username: string;
      location: { latitude: number; longitude: number; accuracy: number };
    }[]
  >([]);

  useEffect(() => {
    document.title = "Dashboard";

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/dashboard`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt_token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    const logout = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          Cookies.remove("jwt_token");
          toast.success(data.message || "Logged out successfully");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    logout();
  };

  return (
    <>
      <header className="bg-secondary text-dark p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => handleLogout()} className="cursor-pointer">
          Logout
        </Button>
      </header>

      <main className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {users.length === 0 && <p className="text-center">No users found.</p>}
        {users.length > 0 && (
          <>
            {users.map((user) => (
              <Card key={user._id} className="flex flex-col justify-between">
                <CardHeader className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold uppercase">
                    {user.username[0]}
                  </div>
                  <div>
                    <CardTitle>{user.username}</CardTitle>
                    <CardDescription>
                      Coordinates {user?.location?.longitude},
                      {user?.location?.latitude}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>Click below to view the user's location on the map.</p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="cursor-pointer"
                    onClick={() => navigate(`/map/${user._id}`)}
                  >
                    View Map
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </main>
    </>
  );
};

export default Dashboard;

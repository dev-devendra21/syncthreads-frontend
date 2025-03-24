import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number | null;
}

const DEFAULT_COORDINATES: Coordinates = {
  latitude: 20.5937,
  longitude: 78.9629,
  accuracy: null,
};

export const MapView: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [coordinates, setCoordinates] =
    useState<Coordinates>(DEFAULT_COORDINATES);

  const [username, setUsername] = useState<string>("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Map";

    const fetchMap = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/map/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt_token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCoordinates(data.location);
          setUsername(data.username);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching map:", error);
      }
    };

    fetchMap();
  }, [id]);

  return (
    <div className="h-screen w-full p-3">
      <Button className="cursor-pointer mb-2" onClick={() => navigate(-1)}>
        {" "}
        🔙 Go Back
      </Button>
      <MapContainer
        center={[coordinates.latitude, coordinates.longitude]}
        zoom={coordinates.accuracy ? 15 : 5}
        scrollWheelZoom={true}
        className="h-11/12 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[coordinates.latitude, coordinates.longitude]}>
          <Popup>
            {loading
              ? "Fetching location..."
              : `${username || "Unknown User"} is here (Accuracy: ${Math.round(
                  coordinates.accuracy ?? 0
                )} meters)`}
          </Popup>
        </Marker>

        {coordinates.accuracy && (
          <Circle
            center={[coordinates.latitude, coordinates.longitude]}
            radius={coordinates.accuracy}
            color="blue"
            fillOpacity={0.3}
          />
        )}
      </MapContainer>
    </div>
  );
};

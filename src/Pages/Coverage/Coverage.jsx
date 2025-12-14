import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default icon issue
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Coverage() {
    const serviceCenter = useLoaderData();
    
  const [search, setSearch] = useState("");

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in <span className="text-primary">64 districts</span>
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search districts..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Map */}
      <div className="w-full h-[500px] rounded-xl overflow-hidden shadow">
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          {/* Map Style */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />

          {/* District Markers */}
          {serviceCenter.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <span className="font-semibold">{center.district}</span><br />
                {center.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

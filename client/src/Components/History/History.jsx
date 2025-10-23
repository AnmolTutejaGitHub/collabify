import { useState } from "react";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router";

function History({ toggleMode,userPreference }) {
  const [collabId, setCollabId] = useState("");
  const [selectedDate,setSelectedDate] = useState("");
  const [historyData,setHistoryData] = useState([]);
  const [message,setMessage] = useState("");
  const [resultType,setResultType] = useState("");

  const API_URL = `${import.meta.env.VITE_API_URL}/api/user`;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function handleSearch(){
    setMessage("");
    setResultType("");
    try {
      const res = await axios.post(
        `${API_URL}/get-collab-history`,
        { collab_id: collabId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistoryData([res.data]);
      setResultType(`Search result for "${collabId}"`);
    } catch(err) {
      setHistoryData([]);
      setMessage(err.response?.data?.message || "Error fetching history");
    }
  }

  async function handleFilter(){
    setMessage("");
    setResultType("");
    try {
      const res = await axios.post(
        `${API_URL}/collab-filter`,
        { date: selectedDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistoryData(res.data.history);
      setResultType(`Filtered results for date: "${selectedDate}"`);
    } catch (err) {
      setHistoryData([]);
      setMessage(err.response?.data?.message || "Error fetching history");
    }
  }

  return (
    <div
      className={`${userPreference.lightmode ? 'bg-white text-black' : 'bg-[#000A08] text-white'} min-h-screen w-full bg-cover bg-top`}
      style={{ backgroundImage: "url('circle.png')" }}
    >
      <NavBar toggleMode={toggleMode} />

      <div className="relative bg-[#1F2937] mt-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col gap-6 p-6 md:p-12">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Enter Collaboration ID"
            value={collabId}
            onChange={(e) => setCollabId(e.target.value)}
            className={`p-2 rounded-md flex-1 outline-none ${userPreference.lightmode ? 'text-black' : 'text-white'}`}
          />
          <button
            onClick={handleSearch}
            className="bg-white/10 backdrop-blur-lg text-white px-6 py-2 rounded-lg hover:bg-white/20 transition"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className={`p-2 rounded-md ${userPreference.lightmode ? 'text-black' : 'text-[#8D9291]'}`}
          />
          <button
            onClick={handleFilter}
            className="bg-white/10 backdrop-blur-lg text-white px-6 py-2 rounded-lg hover:bg-white/20 transition"
          >
            Filter
          </button>
        </div>

        {message && <p className="text-red-500">{message}</p>}

        {resultType && <p className="text-yellow-400 font-medium mt-2">{resultType}</p>}

        <div className="flex flex-col gap-4 mt-4">
          {historyData.map((item,idx) => (
            <div key={idx} className="bg-white/20 p-4 rounded-md shadow-md" onClick={()=>navigate(`/collab/${item.collab_id}`)}>
              <p>Collab ID: {item.collab_id}</p>
              <p>User ID: {item.user_id}</p>
              <p>Accessed At: {new Date(item.AccessedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
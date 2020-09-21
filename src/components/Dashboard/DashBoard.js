import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Dashboard = (props) => {
  const [rooms, setRooms] = React.useState([]);
  const getRooms = () => {
    axios
      .get("http://localhost:8000/room", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setRooms(response.data);
      })
      .catch((err) => {
        setTimeout(getRooms, 3000);
      });
  };

  React.useEffect(() => {
    getRooms();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="card">
      <div className="cardHeader">Community</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="roomName">Community Name</label>
          <input
            type="text"
            name="roomName"
            id="roomName"
            placeholder="New Community"
          />
        </div>
      </div>
      <button>Create Community</button>
      <div className="chatrooms">
        {rooms.map((room) => (
          <div key={room._id} className="chatroom">
            <div>{room.name}</div>
            <Link to={"/room/" + room._id}>
              <div className="join">Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

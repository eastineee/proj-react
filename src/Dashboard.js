import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import bg1 from "./ye.jpg";
import bg2 from "./ps.jpg";
import bg3 from "./th.jpg";
import avatar from "./avatar.jpg"; // Default profile picture
import caplogo from "./caplogo.png"; 
import song from "./your-song.mp3"; 
import albumCover from "./jrj.jpg"; 

export default function Dashboard() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio(song));

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Get user info from local storage
  const user = JSON.parse(localStorage.getItem("user")) || { username: "You" };

  // Profile Picture State
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || avatar);

// Handle Profile Picture Upload
  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result); // Save in local storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const volumeValue = event.target.value;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  return (
    <div className="dashboard">
      {/* Navigation Bar */}
      <div className="top-navbar">
        <div className="logo-container">
          <img src={caplogo} alt="Capybara Logo" className="logo" />
          <span className="title">Capybaraonly</span>
        </div>
        <div className="nav-links">
          <a href="https://www.youtube.com/@jennierubyjane" target="_blank" rel="noopener noreferrer">Youtube</a>
          <a href="https://jennie.lnk.to/discordAW" target="_blank" rel="noopener noreferrer">Discord</a>
          <a href="https://www.instagram.com/jennierubyjane" target="_blank" rel="noopener noreferrer">Instagram</a>

      {/* User Profile Dropdown */} 
      <div className="profile-dropdown">
        <button className="profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img src={profilePic} alt="Profile" className="profile-avatar" />
        </button>

        {dropdownOpen && (
          <div className="dropdown-content">
            <img src={profilePic} alt="Profile" className="dropdown-profile-pic" /> 
            <h2>{user.username}</h2>
            <p>{user.email || "N/A"}</p>
            <button className="logout-btn" onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </div>

        </div>
      </div>

      {/* Tickets Section */}
      <section className="section tickets-section" style={{ backgroundImage: `url(${bg3})` }}>
        <a href="https://jennie.lnk.to/therubyexperience" className="get-tickets-btn" target="_blank" rel="noopener noreferrer">Get Ticket</a>
      </section>

      {/* Music Section */}
      <section className="section" style={{ backgroundImage: `url(${bg1})` }}>
        <div className="container">
          {/* Left Column (Ruby - Music Player) */}
          <div className="column">
            <h2 className="ruby-title">Ruby</h2>
            <div className="music-player">
  <div className="album-container">
    <img src={albumCover} alt="Album Cover" className="album-image" />
    <button className="play-btn" onClick={togglePlayPause}>
      {isPlaying ? "❚❚" : "▶"}
    </button>
  </div>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={volume}
    onChange={handleVolumeChange}
    className="volume-slider"
  />
</div>

          </div>

          {/* Right Column (Jane) */}
          <div className="column">
            <h2 className="jane-title">Jane</h2>
            <div className="button-group">
              <a href="https://open.spotify.com/artist/250b0Wlc5Vk0CoUsaCY84M" className="custom-btn" target="_blank" rel="noopener noreferrer">Listen more on Spotify</a>
              <a href="https://music.apple.com/us/artist/jennie/913944" className="custom-btn" target="_blank" rel="noopener noreferrer">Listen on Apple Music</a>
              <a href="https://www.tiktok.com/@jennierubyjane" className="custom-btn" target="_blank" rel="noopener noreferrer">Sing/Dance on Tiktok</a>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="section album-section" style={{ backgroundImage: `url(${bg2})` }}>
        <a href="https://jennie.lnk.to/shop" className="shop-now-btn" target="_blank" rel="noopener noreferrer">Shop Now</a>
      </section>

      {/* Footer */}
      <footer className="footer">
        © 2025 Capybaraonly. All rights reserved.
      </footer>
    </div>
  );
}

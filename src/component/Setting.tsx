import React, { useState, useEffect } from "react";
import '../index.css';

const Settings = () => {
  const [autoplay, setAutoplay] = useState(true);
  const [language, setLanguage] = useState("Vietnamese");
  const [theme, setTheme] = useState("same-as-os"); // Default to "same-as-os"
  const [volume, setVolume] = useState(50); // New state for volume

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
      root.classList.toggle("light", !prefersDark);
    }
  }, [theme]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Cài đặt</h2>
        </div>

        {/* Language */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Ngôn ngữ</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="form-select w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="English">English</option>
            <option value="Vietnamese">Tiếng Việt</option>
          </select>
          <p className="text-gray-500 mt-1">
            Chọn ngôn ngữ mà bạn sử dụng.
          </p>
        </div>

        {/* Mute Volume */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="text-gray-700 font-medium">Âm thanh</label>
              <p className="text-gray-500 mt-1">
                Tắt âm thanh nếu bạn không cần nó.
              </p>
            </div>
            <input
              type="checkbox"
              className="toggle toggle-primary x-6 y-6 transform scale-150" // Enlarged checkbox
              checked={autoplay}
              onChange={() => setAutoplay(!autoplay)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mức âm lượng</label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-gray-500 mt-1">Mức âm lượng hiện tại: {volume}%</p>
          </div>
        </div>

        {/* Theme Mode */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Chế độ giao diện</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="form-select w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="light">Chế độ sáng</option>
            <option value="dark">Chế độ tối</option>
            <option value="same-as-os">Theo hệ điều hành</option>
          </select>
          <p className="text-gray-500 mt-1">
            Chọn chế độ giao diện phù hợp với bạn.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button className="btn btn-danger" onClick={() => console.log("Cancelled")}>Thoát</button>
          <button
            className="btn btn-custom"
            onClick={() => console.log("Saved Settings", { autoplay, language, theme, volume })}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

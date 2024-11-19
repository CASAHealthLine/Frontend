import React, { useState } from "react";

const Settings = () => {
  const [autoplay, setAutoplay] = useState(true);
  const [showProfilePhotos, setShowProfilePhotos] = useState(false);
  const [language, setLanguage] = useState("Vietnamese");

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-96">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-purple-600">Cài đặt</h2>
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
            <option value="Vietnamese">Vietnamese</option>
          </select>
          <p className="text-gray-500 mt-1">
            Chọn ngôn ngữ mà bạn sử dụng.
          </p>
        </div>

        {/* Mute Volume */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <label className="text-gray-700 font-medium">Âm thanh</label>
            <p className="text-gray-500 text-sm">
              Tắt âm thanh nếu bạn không cần nó.
            </p>
          </div>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={autoplay}
            onChange={() => setAutoplay(!autoplay)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3">
          <button className="btn btn-secondary" onClick={() => console.log("Cancelled")}>
            Thoát
          </button>
          <button
            className="btn btn-primary"
            onClick={() => console.log("Saved Settings", { autoplay, showProfilePhotos, language })}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

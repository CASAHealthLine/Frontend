import { useEffect, useState } from "react";
import { Clock, CalendarDays } from "lucide-react";

const Time = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="w-50 ml-2">
      <h1 className="text-2xl font-bold mb-4">Thời gian hiện tại:</h1>
      <p className="text-xl flex flex-row">
        <Clock className="w-10 self-center" />{" "}
        {time.toLocaleDateString("en-GB")}{" "}
      </p>
      <p className="text-xl flex flex-row">
        <CalendarDays className="w-10 self-center" />
        {time.toLocaleTimeString()}{" "}
      </p>
    </div>
  );
};

export const Queueinfo = () => {
  return (
    <div class="p-3 m-3 w-50 bg-white shadow sm:rounded-lg flex flex-row">
      <div>
        <p className="text-xl">Vị trí trong hàng chờ: </p>
        <div>
          <p className="text-xl">
            Lần khám dự kiến gần nhất tiếp theo của bạn là:{" "}
          </p>
          <p className="text-rose-400 text-xl">Ngày 29/10</p>
          <p className="text-rose-400 text-xl">Địa điểm: Phòng 101</p>
        </div>
      </div>
      <Time />
    </div>
  );
};

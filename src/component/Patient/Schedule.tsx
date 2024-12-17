import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

interface Appointment {
  fromDate: Date;
  toDate?: Date;
  description: string;
  location: string;
}

interface ScheduleItemProps {
  item: Appointment;
  index?: number;
  type: 'upcoming' | 'completed';
}

interface ScheduleProps {
  upcoming: Appointment[];
  completed: Appointment[];
  className?: string;
}

const formatDateToMonthAbbr = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date).toUpperCase();
};

const formatTime = (date: string | number | Date, withPeriod = true) => {
  return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
  })
      .format(new Date(date))
      .replace(withPeriod ? '' : / AM| PM/, '');
};

const ScheduleItem: React.FC<ScheduleItemProps> = ({ item, index, type }) => {  
  return (
    <div className="flex flex-row w-fit max-h-44">
      <div className="flex flex-col items-center gap-1">
        <div className="text-sm"
          style={{ color: type === 'upcoming' ? '#61b0ff' : 'var(--primary-bg-color)' }}
        >
          {formatDateToMonthAbbr(item.fromDate)}
        </div>
        <text className="rounded-full w-8 h-8 flex items-center justify-center text-xl text-white text-center"
          style={{ backgroundColor: type === 'upcoming' ? '#61b0ff' : 'var(--primary-bg-color)' }}
        >
          {item.fromDate.getDate()}
        </text>
        <div 
          className="w-1 rounded-full flex-1"
          style={{ backgroundColor: type === 'upcoming' ? '#61b0ff' : 'var(--primary-bg-color)' }} 
        />
      </div>
      <div className="flex flex-col gap-1 ml-4 shadow-sm p-4 rounded-lg w-60 bg-white mt-2">
        <div className="font-semibold text-md">
          {item.toDate ? `${formatTime(item.fromDate, false)} - ${formatTime(item.toDate)}` : formatTime(item.fromDate)}
        </div>
        <div className="text-lg">{item.description}</div>
        <div className="text-sm text-gray-500">{item.location}</div>
      </div>
    </div>
  );
};

const ScheduleSession: React.FC<{ title: string, data?: Appointment[], type: 'upcoming' | 'completed' }> = ({ title, data, type }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const color = type === 'upcoming' ? '#61b0ff' : 'var(--primary-bg-color)';

  return (
    <>
      <ListItemButton onClick={() => setIsExpanded(!isExpanded)} className="flex flex-row items-center gap-2">
        <div className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: color }}
        />
        <ListItemText className="">
          <div className="flex font-semibold text-gray-800 flex-row items-center gap-2">
            {`${title} (${data?.length || 0})`} 
            <div className="border-t border-gray-300 flex-grow border-dashed border-t-2" />
          </div>
        </ListItemText>
        {isExpanded ? <ChevronDownIcon size={24} /> : <ChevronRightIcon size={24} />}
      </ListItemButton>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className="flex flex-col gap-3 overflow-y-auto py-1 max-h-80 items-center">
          {data?.map((item, index) => (
            <ScheduleItem key={index} item={item} type={type} />
          ))}
        </List>
      </Collapse>
    </>
  );
}

const Schedule: React.FC<ScheduleProps> = ({ upcoming, completed, className }) => {
  return (
    <List className={`w-96 h-full p-4 ${className}`}
      style={{ backgroundColor: 'var(--secondary-bg-color)' }}
    >
      <ScheduleSession title='Sắp tới' data={upcoming} type='upcoming' />
      <ScheduleSession title='Đã hoàn thành' data={completed} type='completed' />
    </List>
  );
};

export default Schedule;
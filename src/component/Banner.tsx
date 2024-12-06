import React from 'react';
import { ChevronRight } from 'lucide-react';

export const Banner = () => {

  return (
    <div className="flex flex-col w-[95%] max-md:ml-0 max-md:w-full">
      <section className="flex overflow-hidden flex-col grow px-8 pt-5 pb-80 w-full font-medium text-white bg-emerald-500 ml-8 rounded-xl min-h-[486px] max-md:px-5 max-md:pb-24 max-md:mt-10 max-md:max-w-full ">
        <h2 className="text-base uppercase">casa healthline</h2>
        <p className="mt-2.5 text-xl max-md:max-w-full">
          Hệ thống quản lý xếp hàng khám bệnh thông minh, tối ưu quy trình và hỗ trợ hiệu quả cho cả bệnh nhân và bác sĩ.
        </p>
        <button className="flex overflow-hidden flex-col justify-center items-center self-start mt-2.5 text-sm tracking-normal leading-5 text-center text-white bg-neutral-900 min-h-[40px] rounded-[100px]">
          <div className="flex flex-1 gap-2 justify-center items-center p-2.5 h-full">
            <span className="self-stretch my-auto">Learn More</span>
            <ChevronRight color="#000000" className="rounded-full flex items-center justify-center bg-white" />
          </div>
        </button>
      </section>
    </div>
  );
};
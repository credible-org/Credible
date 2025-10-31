import React from "react";

const InfoCards = ({ card }) => {
  const IconComponent = card.icon;
  return (
    <div className="flex flex-col justify-between border rounded-[14px] itemsborder w-1/4 h-48 p-4">
      <div
        className="text-2xl border w-fit p-2 rounded-xl">
        <IconComponent />
      </div>
      <div className="text-xl font-semibold">{card.title}</div>
      <div>{card.desc}</div>
    </div>
  );
};

export default InfoCards;

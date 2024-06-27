import React, { useState } from 'react';

const Tabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (label) => {
    setActiveTab(label);
    onTabChange(label);
  };

  return (
    <div className="flex flex-col">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`py-2 px-4 text-sm font-bold leading-5 text-gray-700 hover:text-gray-900 ${
              activeTab === tab.label ? 'border-b-2 border-blue-600' : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div key={tab.label} className={`${activeTab === tab.label ? '' : 'hidden'}`}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;

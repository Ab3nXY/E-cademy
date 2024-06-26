import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab.label)}
            className={`py-2 px-4 border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300 ${
              activeTab === tab.label ? 'border-b-2 border-blue-500 text-blue-600' : ''
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

import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl text-gray-700 font-bold">{title}</h2>
      <h3 className="text-gray-700">{subtitle}</h3>
    </div>
  );
};

export default Header;
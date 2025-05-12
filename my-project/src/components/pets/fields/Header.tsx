import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="flex flex-col items-start justify-center">
      <h1 className="text-3xl text-gray-700 font-bold">{title}</h1>
      <p className="text-gray-700 text-sm">{subtitle}</p>
    </header>
  );
};

export default Header;

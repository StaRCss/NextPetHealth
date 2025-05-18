import React from 'react';

interface HeaderProps {
  title: string;
}

const Header = React.memo<HeaderProps>(({ title }) => {
  return (
    <header className="flex flex-col items-start justify-center">
      <h1 className="text-3xl text-gray-700 font-bold">{title}</h1>
    </header>
  );
});

Header.displayName = "Header";

export default Header;

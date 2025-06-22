import React from 'react';

interface HeaderProps {
  title: string;
}

const Header = React.memo<HeaderProps>(({ title }) => {
  return (
    <header className="flex flex-col items-start justify-center text-purple-500">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className=" mt-1">Add cat information below.</p>

    </header>
  );
});

Header.displayName = "Header";

export default Header;
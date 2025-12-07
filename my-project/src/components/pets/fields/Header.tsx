import React from 'react';

interface HeaderProps {
  title: string;
}

const Header = React.memo<HeaderProps>(({ title }) => {
  return (
    <header className="flex flex-col items-start justify-center text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold">{title}</h1>

    </header>
  );
});

Header.displayName = "Header";

export default Header;
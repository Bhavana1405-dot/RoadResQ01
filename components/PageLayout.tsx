<<<<<<< HEAD
'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {isHomePage ? (
        <Navigation />
      ) : (
        <Sidebar />
      )}
      <main className={`${!isHomePage ? 'md:ml-[80px] transition-[margin] duration-300' : ''}`}>
        {children}
      </main>
    </>
  );
};

=======
'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {isHomePage ? (
        <Navigation />
      ) : (
        <Sidebar />
      )}
      <main className={`${!isHomePage ? 'md:ml-[80px] transition-[margin] duration-300' : ''}`}>
        {children}
      </main>
    </>
  );
};

>>>>>>> 7f5fc52 (first commit)
export default PageLayout; 
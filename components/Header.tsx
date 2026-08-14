'use client';
import { ArrowLeft, BookOpen, Calendar1, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface HeaderProps {
  leftIcon: 'menu' | 'back';
  onLeftClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ leftIcon, onLeftClick }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      <div className='w-full fixed z-40 p-3 bg-paper border-b border-b-paper-shadow flex justify-between items-center'>
        {leftIcon === 'menu' ? (
          <div className='doodle-icon'>
            <Menu
              size={16}
              strokeWidth={2.5}
              className='text-ink/60'
              onClick={openMenu}
            />
          </div>
        ) : (
          <div className='doodle-icon' onClick={() => router.back()}>
            <ArrowLeft size={16} strokeWidth={2.5} className='text-ink' />
          </div>
        )}
        <p className='font-body'>MPASI Affan & Bilal</p>
        <div />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className='fixed top-0 bottom-0 z-50 w-3/4 md:w-1/4 bg-paper border-r border-r-paper-shadow p-5'
            >
              <div className='w-full flex justify-between items-center'>
                <p>Affan Bilal</p>
                <div className='doodle-icon'>
                  <X
                    width={16}
                    strokeWidth={2.5}
                    className='text-ink'
                    onClick={closeMenu}
                  />
                </div>
              </div>

              <div className='flex flex-col mt-6 gap-2'>
                <Link
								href='/'
                  className={`flex gap-2 p-3 rounded-lg cursor-pointer ${
                    pathName === '/' ? 'bg-paper-shadow/40' : 'hover:bg-paper-shadow/60'
                  }`}
                >
                  <Calendar1
                    width={16}
                    strokeWidth={2.5}
                    className='text-ink'
                  />
                  <span>Rencana Mingguan</span>
                </Link>
                <Link href='/recipes'
                  className={`flex gap-2 p-3 rounded-lg cursor-pointer ${
                    pathName === '/recipes' ? 'bg-paper-shadow/40' : 'hover:bg-paper-shadow/60'
                  }`}
                >
                  <BookOpen width={16} strokeWidth={2.5} className='text-ink' />
                  <span>Daftar Resep</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

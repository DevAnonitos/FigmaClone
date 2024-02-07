"use client";

import Live from '@/components/Live';
import { LeftSidebar, Navbar, RightSidebar } from '@/components/index';
import React from 'react';

const Home = () => {
  return (
    <>
      <main className='h-screen overflow-hidden'>
        <Navbar />
        <section className='flex h-full flex-row'>
          <LeftSidebar />

          <Live />

          <RightSidebar />
        </section>
      </main>
    </>
  );
};

export default Home;
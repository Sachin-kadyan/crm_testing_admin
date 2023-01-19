import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Consumer from '../../screen/support/consumer/Consumer';
import Home from '../../screen/support/home/Home';
import Search from '../../screen/support/search/Search';

const Support = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/consumer/:id" element={<Consumer />} />
    </Routes>
  );
};

export default Support;

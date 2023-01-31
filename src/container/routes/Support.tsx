import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Consumer from '../../screen/support/consumer/Consumer';
import EstimateWidget from '../../screen/support/consumer/EstimateWidget';
import Home from '../../screen/support/home/Home';
import RegisterConsumer from '../../screen/support/register/RegisterConsumer';
import Search from '../../screen/support/search/Search';

const Support = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/register" element={<RegisterConsumer />} />
      <Route path="/consumer/:id" element={<Consumer />} />
      <Route
        path="/consumer/:id/estimate/:prescriptionId"
        element={<EstimateWidget />}
      />
    </Routes>
  );
};

export default Support;

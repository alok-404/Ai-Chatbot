import React, { Suspense, lazy } from "react";
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import("../pages/Home"));
const Chat = lazy(() => import('../pages/Chat'));

const Mainroutes = () => {
  return (
    <Suspense
      fallback={
        <div className="text-white p-4 flex flex-col items-center justify-center min-h-screen">
          <img
            className='h-32 w-32 mb-4'
            src="/giphy.gif"
            alt="loading"
          />
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Suspense>
  );
}

export default Mainroutes;

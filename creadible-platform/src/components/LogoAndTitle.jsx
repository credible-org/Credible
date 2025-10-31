import React from 'react'

const LogoAndTitle = () => {
    return (
      <div>
        <div className="w-full flex justify-center items-center gap-4 mb-7">
          <img src="vite.svg" alt="Credible-image" className="w-14 h-14" />
          <h1 className="text-7xl font-bold">Credible</h1>
        </div>
        <div className='flex flex-col justify-center items-center gap-1 text-xl'>
          <div>
            The decentralized reputation network for verification credentials.
            Build
          </div>
          <div>trust through blockchain-verified achievements</div>
        </div>
      </div>
    );
}

export default LogoAndTitle
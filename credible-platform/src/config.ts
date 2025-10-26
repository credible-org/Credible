import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected, walletConnect, metaMask } from 'wagmi/connectors';

const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID ;

export const config = createConfig({
    chains: [sepolia],

    connectors: [
        metaMask(),
        injected({ shimDisconnect: true }),
        walletConnect({ projectId: WALLETCONNECT_PROJECT_ID }),
    ],
    transports: {
        [sepolia.id]: http(),
    },
    ssr: true,
});
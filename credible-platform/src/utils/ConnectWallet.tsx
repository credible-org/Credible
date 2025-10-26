
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function ConnectWalletButton() {
    const { address, isConnected, isConnecting } = useAccount();
    const { connectors, connect } = useConnect();
    const { disconnect } = useDisconnect();

    // If the wallet is connected, show the address and a disconnect button
    if (isConnected) {
        // Shorten the address for display
        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

        return (
            <div style={{ padding: '10px', border: '1px solid green', borderRadius: '4px' }}>
                <p>✅ Connected: **{shortAddress}**</p>
                <button onClick={() => disconnect()}>Disconnect</button>
            </div>
        );
    }

    // If the wallet is connecting, show a loading state
    if (isConnecting) {
        return (
            <button disabled style={{ padding: '10px', backgroundColor: '#ccc' }}>
                Connecting...
            </button>
        );
    }

    // If not connected, show the available connection options
    return (
        <div style={{ padding: '10px', border: '1px solid #333', borderRadius: '4px' }}>
            <h3>Connect Wallet</h3>

            {connectors.map((connector) => (
                <button
                    key={connector.uid}
                    // Only enable the button if the connector is ready (installed)
                    disabled={!connector.ready}
                    onClick={() => connect({ connector })}
                    style={{
                        margin: '5px',
                        // Optional styling to visually indicate unsupported connectors
                        backgroundColor: connector.ready ? '#007bff' : '#f8f9fa',
                        color: connector.ready ? 'white' : 'gray',
                        cursor: connector.ready ? 'pointer' : 'not-allowed',
                    }}
                >
                    {connector.name}
                    {/* Display (unsupported) only if the connector is not ready */}
                    {!connector.ready && ' (unsupported)'}
                </button>
            ))}

            {/* A simple message if no connectors are available */}
            {connectors.every(c => !c.ready) && (
                <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#6c757d' }}>
                    Please install a wallet extension like MetaMask or use WalletConnect.
                </p>
            )}
        </div>
    );
}
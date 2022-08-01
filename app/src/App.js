import React, { useEffect, useState } from "react";
import "./App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import discordLogo from "./assets/discord-logo.svg";
import CandyMachine from "./CandyMachine";

// Constants
const TWITTER_HANDLE = "PacBoysclub";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const DISCORD_HANDLE = "Join the community";
const DISCORD_LINK = "https://discord.gg/AWEACE2Z";

const App = () => {
    // Actions
    const [walletAddress, setWalletAddress] = useState(null);

    /*
     * Declare your function
     */
    const checkIfWalletIsConnected = async () => {
        try {
            const { solana } = window;

            if (solana) {
                if (solana.isPhantom) {
                    console.log("Phantom wallet found!");
                    const response = await solana.connect({ onlyIfTrusted: true });
                    console.log("Connected with Public Key:", response.publicKey.toString());
                    setWalletAddress(response.publicKey.toString());
                }
            } else {
                alert("Solana object not found! Get a Phantom Wallet 👻");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const connectWallet = async () => {
        const { solana } = window;

        if (solana) {
            const response = await solana.connect();
            console.log("Connected with Public Key:", response.publicKey.toString());
            setWalletAddress(response.publicKey.toString());
        }
    };

    const renderNotConnectedContainer = () => (
        <button className="cta-button connect-wallet-button" onClick={connectWallet}>
            Connect to Wallet
        </button>
    );

    /*
     * When our component first mounts, let's check to see if we have a connected
     * Phantom Wallet
     */
    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected();
        };
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
    }, []);

    return (
        <div className="App">
                <div className="container">  
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">HOME<span class="sr-only"></span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">ROADMAP</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">TEAM</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" >GAME</a>
      </li>
    </ul>
  </div>
</nav>
                <div className="header-container">
                    <p className="header">PACBOYS CLUB</p>
                    <p className="sub-text">Coming Soooon!</p>
                    {/* Render your connect to wallet button right here */}
                    {!walletAddress && renderNotConnectedContainer()}
                </div>
                {walletAddress && <CandyMachine walletAddress={window.solana} />}
                <div className="footer-container">
                    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
                    <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">{`${TWITTER_HANDLE}`}</a>

                    <img alt="Discord Logo" className="discord-logo" src={discordLogo} />
                    <a className="footer-text" href={DISCORD_LINK} target="_blank" rel="noreferrer">{`${DISCORD_HANDLE}`}</a>
                </div>
            </div>
        </div>
    );
};

export default App;

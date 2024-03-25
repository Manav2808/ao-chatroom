"use client";

import { ConnectButton } from "arweave-wallet-kit";
import { useActiveAddress } from "arweave-wallet-kit";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const activeAddress = useActiveAddress() || null;

  const messages = ["Hey", "Hey", "Hey", "Hey", "Hey", "Hey", "Hey", "Hey", "Hey", "Hey", "Hey", "Hey"]
  const displayMessages = messages.map((message, index) => ( <div key={index}>{message}</div> ))

  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    // if (activeAddress === null) {
    //   alert("Please connect your wallet to proceed");
    // }
    if (inputValue === "") {
      alert("Please enter a message");
    }
    else {
      try {
        const response = await axios.post('http://localhost:4000', {message});
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <ConnectButton showBalance={true} showProfilePicture={true} />
      <div>
        <div className="bg-red-700 w-96 h-96">
          {displayMessages}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter a message..."
            className="border-2"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>
    </div>
  );
} 
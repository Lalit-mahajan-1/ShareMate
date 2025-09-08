import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import "./CSS/ShareSection.css";

const ShareSection = ({ shareUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="share-container">
      <h3 className="share-heading">Share this note</h3>
      <p className="share-subtext">
        Copy the link below and share it with others.
      </p>

      <div className="share-box">
        <input type="text" value={shareUrl} readOnly className="share-input" />
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </button>
      </div>

      {copied && <span className="copied-msg">Link copied!</span>}
    </div>
  );
};

export default ShareSection;

import React from "react";

export default function GoogleMap() {
  return (
    <div className="ak-google-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.543449746125!2d-79.3311454234416!3d43.7408103467595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cd02d6335045%3A0x62a459ceac7d22c8!2sThememarch!5e0!3m2!1sen!2sbd!4v1703419944461!5m2!1sen!2sbd"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

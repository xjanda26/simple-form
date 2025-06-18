import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/HttpTrigger1?code=${import.meta.env.VITE_FUNCTION_KEY}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Súbor úspešne nahratý.");
      } else {
        setMessage("Nastala chyba pri nahrávaní.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Chyba pripojenia k serveru.");
    }
  };

  return (
    <div>
      <h1>Nahrávanie obrázka</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">Odoslať</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

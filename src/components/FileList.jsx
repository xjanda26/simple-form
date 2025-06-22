// src/components/FileList.jsx
import { useState, useEffect } from 'react';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/GetFiles?code=${import.meta.env.VITE_FUNCTION_GET_FILES_KEY}==`);

        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }

        // The API returns the array directly, not wrapped in a 'files' property
        const data = await response.json();
        setFiles(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching files:', err);
        setError('Failed to load files');
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  if (loading) return <p>Načítavam súbory...</p>;
  if (error) return <p>Chyba: {error}</p>;
  if (files.length === 0) return <p>Zatiaľ neboli nahrané žiadne súbory.</p>;

  return (
    <div className="file-list">
      <h2>Nahrané súbory</h2>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name.substring(file.name.indexOf('-') + 1)}
            </a>
            <span className="file-size">
              {file.properties && file.properties.contentLength &&
                `(${Math.round(file.properties.contentLength / 1024)} KB)`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
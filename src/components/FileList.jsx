import { useState, useEffect } from 'react';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/GetFiles?code=${import.meta.env.VITE_FUNCTION_GET_FILES_KEY}==`);

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      setFiles(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError('Failed to load files');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="file-list">
      <div className="file-list-header">
        <h2>Nahrané súbory</h2>
        <button
          onClick={fetchFiles}
          disabled={loading}
          className="refresh-button"
        >
          {loading ? 'Načítavam...' : 'Obnoviť'}
        </button>
      </div>

      {loading && <p>Načítavam súbory...</p>}
      {error && <p>Chyba: {error}</p>}
      {!loading && !error && files.length === 0 && <p>Zatiaľ neboli nahrané žiadne súbory.</p>}

      {files.length > 0 && (
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
      )}
    </div>
  );
}
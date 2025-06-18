// src/App.jsx
import UploadForm from './components/UploadForm';
import FileList from './components/FileList';

export default function App() {
  return (
    <div className="app">
      <h1>Uploader</h1>
      <UploadForm />
      <FileList />
    </div>
  );
}
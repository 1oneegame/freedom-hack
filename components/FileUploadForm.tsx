'use client'
import { useState } from 'react';

const FileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Пожалуйста, выберите файл');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Отправка запроса на сервер
      const res = await fetch('@/components/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.text) {
        setTranscription(data.text);
      } else {
        alert('Произошла ошибка');
      }
    } catch (error) {
      console.error('Ошибка при транскрипции:', error);
      alert('Ошибка при транскрипции');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Загрузите аудиофайл для транскрипции</h1>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="block w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Загрузка...' : 'Отправить файл'}
      </button>

      {transcription && (
        <div className="mt-4">
          <h2 className="font-bold">Результат транскрипции:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;

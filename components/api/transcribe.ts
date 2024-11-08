import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import nextConnect from 'next-connect';
import multer from 'multer';

// Настроим multer для обработки файлов
const upload = multer({
  storage: multer.memoryStorage(), // Сохраняем файл в памяти
});

const handler = nextConnect()
  .use(upload.single('file')) // Обрабатываем один файл с именем 'file'
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Получаем файл из тела запроса
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не найден' });
    }

    const fileBuffer = req.file.buffer;

    // Читаем ключ из переменных окружения
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: 'API ключ не найден' });
    }

    const formData = new FormData();
    formData.append('file', fileBuffer, 'audio.mp3');
    formData.append('model', 'whisper-1');

    try {
      const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      });

      return res.status(200).json({ text: response.data.text });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Произошла ошибка при транскрипции' });
    }
  });

export default handler;

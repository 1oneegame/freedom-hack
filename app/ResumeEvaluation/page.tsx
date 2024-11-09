"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, FileText, Upload, XCircle } from "lucide-react";
import React, { useState } from "react";

export default function ResumeEvaluation() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError("Пожалуйста, загрузите файл в формате .pdf или .docx");
        setFile(null);
      }
    }
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          simulateEvaluation();
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const simulateEvaluation = () => {
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setEvaluation(`
        Оценка резюме:
        - Опыт работы: 8/10
        - Образование: 7/10
        - Навыки: 9/10
        - Общее впечатление: 8/10

        Рекомендации:
        1. Добавьте больше конкретных достижений в описание опыта работы.
        2. Укажите любые дополнительные курсы или сертификаты, связанные с вашей областью.
        3. Структурируйте раздел навыков, группируя их по категориям.

        Общий рейтинг: 80/100
        Ваше резюме производит хорошее впечатление. С небольшими улучшениями оно станет еще сильнее.
      `);
    }, 3000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      simulateUpload();
    } else {
      setError("Пожалуйста, выберите файл для загрузки");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Оценка резюме ИИ
          </CardTitle>
          <CardDescription className="text-center">
            Загрузите ваше резюме в формате .docx или .pdf для анализа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Нажмите для загрузки</span>{" "}
                    или перетащите файл
                  </p>
                  <p className="text-xs text-gray-500">
                    .PDF или .DOCX (макс. 10MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                />
              </label>
            </div>
            {file && (
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#4fb84f]" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
            )}
            {error && (
              <div className="flex items-center space-x-2 text-red-500">
                <XCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-[#4fb84f] hover:bg-[#45a045] text-white"
              disabled={!file || uploading || evaluating}
            >
              {uploading
                ? "Загрузка..."
                : evaluating
                ? "Оценка..."
                : "Отправить на оценку"}
            </Button>
          </form>

          {(uploading || evaluating) && (
            <div className="mt-6 space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-center">
                {uploading ? "Загрузка файла..." : "Оценка резюме..."}
              </p>
            </div>
          )}

          {evaluation && (
            <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <CheckCircle className="w-5 h-5 text-[#4fb84f] mr-2" />
                Результат оценки
              </h3>
              <pre className="whitespace-pre-wrap text-sm">{evaluation}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
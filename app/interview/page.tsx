'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";


const Page = () => {
    const [file, setFile] = useState(null);

  
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
        setFile(selectedFile);
        }
    };
    let name = "Арыстан"
    return(
        <div className="flex flex-col bg-gray-50 p-6">
            <h1 className="text-center ml-0 text-3xl font-bold text-green-600 mb-8 md:ml-10 md:text-left justify-start">Привет, {name}!</h1>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg  w-full py-6">
                    <p className="text-center mb-4 text-2xl font-semibold">Сгенерируйте резюме</p>
                    <Button size="lg" variant="default" className="px-4 py-4 w-40 h-6">Сгенерировать</Button>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg  w-full py-6">
                    <p className="text-center mb-4 text-2xl font-semibold">Загурзите свое резюме</p>
                    <Input
                        id="fileInput"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="mt-2 mb-4"
                        onChange={handleFileChange}
                    />
                    <Button size="lg" variant="default" className="px-4 py-4 w-40 h-6">Загрузить</Button>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg  w-full py-6">
                    <p className="text-center mb-4 text-2xl font-semibold">Текст3</p>
                    <Button size="lg" variant="default" className="px-4 py-4 w-40 h-6">button3</Button>
                </div>
            </div>
        </div>
    );
};

export default Page;
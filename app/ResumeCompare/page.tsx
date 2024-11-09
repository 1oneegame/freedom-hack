'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Heart } from "lucide-react";

import { useState } from "react";

export default function ResumeCompare(){
    const obejects = [{
        name:"Асхат",
        description: `
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
        `
    ,
    },
    {
        name:"Арыстан",
        description: `
        Оценка резюме:
        - Опыт работы: 5/10
        - Образование: 9/10
        - Навыки: 7/10
        - Общее впечатление: 7/10

        Рекомендации:
        1. Добавьте больше конкретных достижений в описание опыта работы.
        2. Укажите любые дополнительные курсы или сертификаты, связанные с вашей областью.
        3. Структурируйте раздел навыков, группируя их по категориям.

        Общий рейтинг: 75/100
        `
    ,
    }];

    const [liked, setLiked] = useState([])
    const [isHidden, setIsHidden] = useState(false);
    const [isHiddenMain, setIsHiddenMain] = useState(true);
    const [now, setNow] = useState(0);
    const [display, setDisplay] = useState(obejects[now]);

    const onClickReject = () => {
        if(now !== obejects.length - 1){
            setDisplay(obejects[now+1]);
            setNow(now+1);
        }else{
            setDisplay(obejects[0]);
            setNow(0);
        }
    }
    const onClickAccept = () => {
    const temp = { name: display.name, description: display.description };
    const isIncluded = liked.some(
        (item) => item.name === temp.name && item.description === temp.description
    );
    if(!isIncluded){
        setLiked((prevLiked) => [...prevLiked, temp]);
    }
    if (now !== obejects.length - 1) {
        setDisplay(obejects[now + 1]);
        setNow(now + 1);
    } else {
        setDisplay(obejects[0]);
        setNow(0);
    }
};

    return(
            <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
            {isHiddenMain && (
            <Card className="w-full max-w-2xl relative">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Оцените:</CardTitle>
                    <CardDescription className="text-center">Резюме кандидата: <b>{display.name}</b></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col justify-center items-center">
                        <div className="rounded-xl bg-gray-100 py-2 px-4">
                            <h1 className="text-lg font-semibold mb-2 flex items-center">
                                {display.name}
                            </h1>
                            <p className="whitespace-pre-wrap text-sm">
                                {display.description}
                            </p>
                        </div>
                        <div className="flex flex-row gap-x-10 mt-4 w-full">
                            <Button onClick={onClickReject} className="w-full bg-[#b84f4f] hover:bg-[#a04545] text-white">Reject</Button>
                            <Button onClick={onClickAccept} className="w-full bg-[#4fb84f] hover:bg-[#45a045] text-white">Accept</Button>
                        </div >
                        <Button variant="outline" className="flex flex-row mt-4 w-fit" onClick={() => {setIsHidden(true), setIsHiddenMain(false)}}><Heart size={26} className="text-red-800 fill-red-700" /></Button>
                    </div>
                </CardContent>
            </Card>
        )}
            {isHidden && liked.length > 0 && (
                <div>
                    <Carousel className="w-full max-w-2xl items-center justify-center ">
                    <CarouselContent>
                        {liked.map((item, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {item.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {item.description}
                                </CardContent>
                            </Card>
                            <Button className="w-full mt-4 bg-[#b84f4f] hover:bg-[#a04545] text-white" onClick={() => {setIsHidden(false), setIsHiddenMain(true)}}>Закрыть</Button>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                    </Carousel>
                </div>
                )}
        </div>
    );
}
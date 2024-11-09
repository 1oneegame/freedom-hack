import { GoogleGenerativeAI } from '@google/generative-ai';

interface answerProps{
  prompt: string;
}

const AiAnswer : React.FC<answerProps> = ({prompt}) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return(
    <p>{result.response.text()}</p>
  );
}
export default AiAnswer;
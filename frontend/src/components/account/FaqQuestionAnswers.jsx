import { useParams } from "react-router-dom";
import faqData from "../../utils/faqData";
import BackButton from "../ui/buttons/BackButton";

function FaqQuestionAnswers() {
    const { faqCategoryId,faqQuestionID } = useParams();
    const category = Object.keys(faqData).find((key) => faqData[key].id === faqCategoryId);
    console.log(typeof category);
    const questionData = faqData[category].questions.find(q => q.id === faqQuestionID);
    console.log(questionData);
    
  return (
    <main className="flex flex-col">
    <div className="ml-4">
        <BackButton/>
    </div>
    
    <div className="my-6 mx-4 pb-12 flex flex-col">
      <div className="flex flex-col mb-6 border-b-2 pb-6">
        
      <h4 className="mb-[6px] font-medium tracking-wider">{questionData?.question}</h4>
      <span className="text-[15px]">{questionData?.answer}</span>
      </div>

    </div>
  </main>
  )
}

export default FaqQuestionAnswers;
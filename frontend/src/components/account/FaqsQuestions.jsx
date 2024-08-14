import { NavLink, useParams } from "react-router-dom";
import faqData from "../../utils/faqData";
import BackButton from "../ui/buttons/BackButton";

function FaqsQuestions() {
  const { faqCategoryId } = useParams();
const category = Object?.keys(faqData)?.find((key) => faqData[key]?.id === faqCategoryId);
  console.log(category);
  const categoryData = faqData[category];
  console.log(categoryData);
  return (
    <main className="flex flex-col">
      <div className="ml-4">
        <BackButton/>
      </div>

      <div className="my-6 mx-4">
        <h4 className="mb-4 text-[18px] font-semibold tracking-wider">
          {categoryData?.categoryName}
        </h4>
        <ul className="divide-y-2">
        {categoryData?.questions?.map((q) => (
          <li className="py-4 font-medium" key={categoryData?.id}>
            <NavLink className="flex justify-between" to={`/account/support/${faqCategoryId}/details/${q?.id}`}>
              <h5>{q?.question}</h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </NavLink>
          </li>
        ))}

        </ul>
      </div>
    </main>
  );
}

export default FaqsQuestions;

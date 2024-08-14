// import { useSearchParams } from "react-router-dom";
// import styled, { css } from "styled-components";
/* eslint react/prop-types: 0 */
import { useSearchParams } from "react-router-dom";

// const StyledFilter = styled.div`
//   border: 1px solid var(--color-grey-100);
//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-sm);
//   border-radius: var(--border-radius-sm);
//   padding: 0.4rem;
//   display: flex;
//   gap: 0.4rem;
// `;

// const FilterButton = styled.button`
//   background-color: var(--color-grey-0);
//   border: none;

//   ${(props) =>
//     props.active &&
//     css`
//       background-color: var(--color-brand-600);
//       color: var(--color-brand-50);
//     `}

//   border-radius: var(--border-radius-sm);
//   font-weight: 500;
//   font-size: 1.4rem;
//   /* To give the same height as select */
//   padding: 0.44rem 0.8rem;
//   transition: all 0.3s;  

//   &:hover:not(:disabled) {
//     background-color: var(--color-brand-600);
//     color: var(--color-brand-50);
//   }
// `;

// function Filter() {
function Filter({ filterField, options }) {
    console.log(filterField,options);
  const [searchParams, setSearchParams] = useSearchParams();
  let currentFilter = searchParams.get(filterField) || options?.at(0)?.value||"all";

  function handleClick(value) {
    currentFilter=value;
    console.log("🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡",currentFilter)
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (

    <div className="border  bg-white shadow-lg rounded-lg border-indigo-100 p-[0.4rem] flex gap-[0.4rem]" >
        
        
        {
            options?.map((option)=>(
                <button className={` text-black text-sm border-none rounded-lg font-medium py-[0.44rem] px-[0.8rem] transition-all duration-[0.3s] hover:bg-indigo-600 hover:text-indigo-50 active:!bg-indigo-600 active:!text-indigo-50 ${currentFilter===option?.value?'bg-indigo-600 text-indigo-50':""} ` }

                key={option.value}
                onClick={(e) =>{
                    e.preventDefault();
                 handleClick(option.value)
                }}
                //   active={option.value === currentFilter}
                  disabled={option.value === currentFilter}

                >
                  {option?.label}
                </button>
        // <FilterButton
        //   label={option?.label}
          
        
        // >
            
        // </FilterButton>
            ))
        }
        
        {/* <button className="bg-white border-none rounded-sm font-medium py-[0.44rem] px-[0.8rem] transition-all duration-[0.3s] hover:bg-indigo-600 hover:text-indigo-50 active:!bg-indigo-600 active:!text-indigo-50">
            All
        </button>
        <button className="bg-white border-none rounded-sm font-medium py-[0.44rem] px-[0.8rem] transition-all duration-[0.3s] hover:bg-indigo-600 hover:text-indigo-50 active:bg-indigo-600 active:text-indigo-50" handleClick={(e)=>{
            e.preventDefault();
        }}>
            With discount
        </button>
        <button className="bg-white border-none rounded-sm font-medium py-[0.44rem] px-[0.8rem] transition-all duration-[0.3s] hover:bg-indigo-600 hover:text-indigo-50 active:bg-indigo-600 active:text-indigo-50">
            In-stock
        </button> */}
    </div>
    
    
    
    // <StyledFilter>
    //   {options.map((option) => (
    //     <FilterButton
    //       key={option.value}
    //       onClick={() => handleClick(option.value)}
    //       active={option.value === currentFilter}
    //       disabled={option.value === currentFilter}
    //     >
    //       {option.label}
    //     </FilterButton>
    //   ))}
    // </StyledFilter>
  );
}

// function FilterButton({active,disabled,label}) {
//     console.log(active,disabled)
//     return (
//         <button className="bg-white border-none rounded-sm font-medium py-[0.44rem] px-[0.8rem] transition-all duration-[0.3s] hover:bg-indigo-600 hover:text-indigo-50 active:!bg-indigo-600 active:!text-indigo-50"


// >
//   {label}
// </button>
//     )
// }


export default Filter;

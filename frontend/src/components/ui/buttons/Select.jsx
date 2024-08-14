
// import styled from "styled-components";

// const StyledSelect = styled.select`
//   font-size: 1.4rem;
//   padding: 0.8rem 1.2rem;
//   border: 1px solid
//     ${(props) =>
//       props.type === "white"
//         ? "var(--color-grey-100)"
//         : "var(--color-grey-300)"};
//   border-radius: var(--border-radius-sm);
//   background-color: var(--color-grey-0);
//   font-weight: 500;
//   box-shadow: var(--shadow-sm);
// `;
/* eslint react/prop-types: 0 */
function Select({ options, value, onChange, ...props }) {
  return (
    <select value={value} onChange={onChange} {...props} className="text-sm py-[0.8rem] px-[1.2rem] border rounded-lg bg-white font-medium shadow-lg border-indigo-100 text">
      {options.map((option) => (
        <option value={option.value} key={option.value} className="bg-white">
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;

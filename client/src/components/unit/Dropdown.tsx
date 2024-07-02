// import React, { forwardRef, useEffect, useRef } from 'react';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { UseFormRegister, FieldValues, Path } from "react-hook-form";

// type Props<TFieldValues extends FieldValues> = {
//   title: string;
//   register: UseFormRegister<TFieldValues>;
//   name: Path<TFieldValues>;
// };

// const Dropdown = <TFieldValues extends FieldValues>({ title, register, name }: Props<TFieldValues>) => {
//   const ref = useRef<HTMLButtonElement | null>(null);

//   useEffect(() => {
//     if (ref.current) {
//       register(name);
//     }
//   }, [ref, register, name]);

//   return (
//     <Select>
//       <SelectTrigger className="w-full" ref={ref}>
//         <SelectValue placeholder={title} />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectGroup>
//           <SelectLabel>Plan</SelectLabel>
//           <SelectItem value="1-3-7-21">1-3-7-21</SelectItem>
//           <SelectItem value="daily">Daily</SelectItem>
//         </SelectGroup>
//       </SelectContent>
//     </Select>
//   );
// };

// export default Dropdown;

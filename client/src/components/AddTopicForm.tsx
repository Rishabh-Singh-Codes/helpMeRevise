import { useForm } from "react-hook-form";
import { AddTopicType, addTopicSchema } from "@shared/validation/topics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { MdOutlineDone } from "react-icons/md";
// import Dropdown from "./unit/Dropdown";

const AddTopicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTopicType>({
    resolver: zodResolver(addTopicSchema),
  });

//   const [topics, setTopics] = useState<(AddTopicType & { id: number })[]>([]);

  const onSubmit = handleSubmit((data) => {
    const newTopic = {
      id: new Date().getTime(),
      ...data,
    };

    const currentSchedule = localStorage.getItem("revisionSchedule");

    if (!currentSchedule) {
      localStorage.setItem("revisionSchedule", JSON.stringify([newTopic]));
    } else {
      const revisionSchedule = JSON.parse(currentSchedule);
      revisionSchedule.push(newTopic);
      localStorage.setItem(
        "revisionSchedule",
        JSON.stringify(revisionSchedule)
      );
    }
  });

  setInterval(() => {
    console.log("checking ....");
    const currentSchedule = localStorage.getItem("revisionSchedule");

    if (!currentSchedule || !currentSchedule.length) {
      setTopics([]);
    } else {
      const revisionSchedule = JSON.parse(currentSchedule);

      const relevantTopics = revisionSchedule.filter(
        (topic: AddTopicType & { id: number }) => {
          const createdAt = topic.id;

          const currTime = new Date().getTime();

          console.log("currTime - createdAt", (currTime - createdAt) / 60);

          if ([1, 3, 7, 21].includes(Math.abs((currTime - createdAt) / 60))) {
            return true;
          }
        }
      );

      if (relevantTopics.length) {
        setTopics(relevantTopics);
      }
    }
  }, 60000);

  return (
    <>
      <form
        className="flex flex-col gap-y-4 mt-8 border p-6 rounded-md"
        onSubmit={onSubmit}
      >
        <h1 className="text-xl font-bold">Fill in the details</h1>
        <label className="flex flex-col">
          Topic
          <input
            type="text"
            placeholder="Lesson/Chapter/Subject whatever you wanna revise"
            className="focus:outline-none border rounded-md p-2"
            {...register("topic")}
          />
          <div className="h-2">
            {errors.topic && (
              <span className={"text-rose-500 text-sm mt-1"}>
                {errors.topic.message}
              </span>
            )}
          </div>
        </label>
        <label className="flex flex-col">
          Domain
          <input
            type="text"
            placeholder="Segregate your topic"
            className="focus:outline-none border rounded-md p-2"
            {...register("domain")}
          />
          <div className="h-2">
            {errors.domain && (
              <span className={"text-rose-500 text-sm mt-1"}>
                {errors.domain.message}
              </span>
            )}
          </div>
        </label>
        <label className="flex flex-col">
          Revision Plan
          <select
            {...register("revisionType")}
            className="p-2 border rounded-md"
          >
            <option value="">Select Revision Plan</option>
            <option value="1-3-7-21">1-3-7-21</option>
            <option value="daily">Daily</option>
          </select>
          <div className="h-2">
            {errors.revisionType && (
              <span className={"text-rose-500 text-sm mt-1"}>
                {errors.revisionType.message}
              </span>
            )}
          </div>
        </label>
        <button
          type="submit"
          className="border w-1/6 mx-auto rounded-md p-2 bg-gray-400 text-white hover:cursor-pointer hover:bg-gray-600 transition-all"
        >
          Add
        </button>
      </form>
      <div className="gap-y-4 mt-8">
        <h1 className="text-xl font-bold">Today's Plan</h1>
        <div className="flex flex-col gap-y-3">
          <div className="border flex items-center border-md p-2 rounded-lg">
            <div className="p-3 bg-purple-300 rounded-md min-w-14 text-center">
              5th
            </div>
            <div className="flex flex-col flex-1 pl-3">
              <div className="flex items-center">Chemical Kinetics</div>
              <div className="text-xs bg-gray-200 w-fit rounded-md py-0.5 px-1">
                Thermodynamics
              </div>
            </div>
            <div className="p-1 bg-green-300 rounded-md">
              <MdOutlineDone className="text-4xl" />
            </div>
          </div>
          <div className="border flex items-center border-md p-2 rounded-lg">
            <div className="p-3 bg-cyan-200 rounded-md min-w-14 text-center">
              2nd
            </div>
            <div className="flex flex-col flex-1 pl-3">
              <div className="flex items-center">Vorticity Stream</div>
              <div className="text-xs bg-gray-200 w-fit rounded-md py-0.5 px-1">
                Computational fluid dynamics
              </div>
            </div>
            <div className="p-1 bg-green-300 rounded-md">
              <MdOutlineDone className="text-4xl" />
            </div>
          </div>
          <div className="border flex items-center border-md p-2 rounded-lg">
            <div className="p-3 bg-blue-300 rounded-md min-w-14 text-center">
              1st
            </div>
            <div className="flex flex-col flex-1 pl-3">
              <div className="flex items-center">
                Kinematic Steering Analysis
              </div>
              <div className="text-xs bg-gray-200 w-fit rounded-md py-0.5 px-1">
                Automotive Systems
              </div>
            </div>
            <div className="p-1 bg-green-300 rounded-md">
              <MdOutlineDone className="text-4xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTopicForm;

import { useForm } from "react-hook-form";
import { AddTopicType, addTopicSchema } from "@shared/validation/topics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
// import { MdOutlineDone } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

// import Dropdown from "./unit/Dropdown";

type AddTopicTypeExtended = AddTopicType & {
  reminderDates: Date[];
};

const AddTopicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTopicTypeExtended>({
    resolver: zodResolver(addTopicSchema),
  });

  const [topics, setTopics] = useState<AddTopicTypeExtended[]>([]);

  const onSubmit = handleSubmit((data) => {
    const plan = data.revisionType;

    const newTopic = {
      id: uuidv4(),
      createdAt: new Date(),
      ...data,
    };

    if (plan === "1-3-7-21") {
      const todaysDate = new Date();
      console.log(
        "todaysDate",
        todaysDate,
        new Date(Date.parse("2024-07-06T15:31:08.684Z")).toLocaleDateString()
      );
      const addDays = (date: Date, days: number) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      };

      const reminderDates = [
        addDays(new Date(Date.parse("2024-07-04T15:31:08.684Z")), 1),
        addDays(todaysDate, 1),
        addDays(todaysDate, 3),
        addDays(todaysDate, 7),
        addDays(todaysDate, 21),
      ];

      newTopic.reminderDates = reminderDates;
    }

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

  const getTodaysPlan = () => {
    const schedule = localStorage.getItem("revisionSchedule");

    if (schedule?.length) {
      const scheduleArr = JSON.parse(schedule);
      const todaysPlan = scheduleArr.filter((topic: AddTopicTypeExtended) =>
        topic?.reminderDates.some(
          (date: Date) =>
            Date.parse(new Date(date).toDateString()) ===
            Date.parse(new Date().toDateString())
        )
      );

      setTopics(todaysPlan);
    }
  };

  useEffect(() => {
    getTodaysPlan();
  }, []);

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
      {topics.length > 0 ? (
        <div className="gap-y-4 mt-8">
          <h1 className="text-xl font-bold">Today's Plan</h1>
          <div className="flex flex-col gap-y-3 ">
            {topics.map((topic: AddTopicType, idx: number) => (
              <div
                className="border flex items-center border-md p-2 rounded-lg"
                key={idx + 1}
              >
                {/* <div className="p-3 bg-purple-300 rounded-md min-w-14 text-center">
                5th
              </div> */}
                <div className="flex flex-col flex-1 pl-3">
                  <div className="flex items-center">{topic.topic}</div>
                  <div className="text-xs bg-gray-200 w-fit rounded-md py-0.5 px-1">
                    {topic.domain}
                  </div>
                </div>
                {/* <div className="p-1 bg-green-300 rounded-md">
                <MdOutlineDone className="text-4xl" />
              </div> */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="font-bold text-xl text-center mt-20">
          No topics to revise today
        </h1>
      )}
    </>
  );
};

export default AddTopicForm;

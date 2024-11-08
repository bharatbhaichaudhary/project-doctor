import { createContext } from "react";

export const AppContect = createContext();

const AppContextProvider = (props) => {

  const calculatAge = (dob) =>{
    const today = new Date()
    const birtDate = new Date(dob)

    let age = today.getFullYear() - birtDate.getFullYear()

    return age
  }

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDataFormat = (slotDate) => {
    const dataArray = slotDate.split("-");
    return (
      dataArray[0] + " " + months[Number(dataArray[1])] + " " + dataArray[2]
    );
  };

  const value = {calculatAge, slotDataFormat};

  return (
    <AppContect.Provider value={value}>{props.children}</AppContect.Provider>
  );
};

export default AppContextProvider
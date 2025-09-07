"use client";
import axios from "axios";


export default function WeatherSearchCard() {
  // const [userData, setUserData] = useState("");
  var formData = new FormData();

  function handleSubmit(formData) {
    const query = formData.get("data");
    console.log(query);
  }
  return (
    <div className="flex items-center justify-center bg-neutral-100 w-90 p-2 max-w-lg rounded shadow-md">
      <form className="flex items-center border-2 border-gray-300 rounded w-80 p-2 bg-white " action={handleSubmit} >
        <input
          type="text"
          name="data"
          placeholder="City, ZipCode or State"
          className="text-black text-lg focus:outline-none flex-1 bg-transparent "
        ></input>
        <button type="submit" className="ml-2 ">
          <img src="/images/search.svg" alt="search" className="w-6 h-6 " />
        </button>
      </form>
    </div>
  );
}

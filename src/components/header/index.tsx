import img from "../../assets/clothes.svg";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ onChange }:any) {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSearchChange = (e:any) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="container mx-auto py-5 flex items-center justify-around">
      <img
        src={img}
        alt="Logo"
        className="w-[100px] h-[50px] cursor-pointer"
        onClick={() => navigate("/main")}
      />
      <button className="flex p-3 rounded-lg gap-2 bg-[#EEEEEE]">
        <MenuIcon />
        <p>Catalog</p>
      </button>
      <input
        type="text"
        className="w-[400px] p-3 rounded-lg bg-[#EEEEEE]"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="flex justify-between w-[100px] gap-3">
        <button
          className="bg-[#EEEEEE] p-3 rounded-lg text-red-700"
          onClick={() => navigate("/wishlist")}
        >
          <FavoriteIcon />
        </button>
        <button className="bg-[#EEEEEE] text-gray-700 p-3 rounded-lg">
          <ShoppingCartIcon />
        </button>
      </div>
    </div>
  );
}

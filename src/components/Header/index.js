import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Products",
      slug: "/get-products",
    },
    {
      name: "Add New Product",
      slug: "/add-products",
    },
  ];

  return (
    <header className="bg-gray-500">
      <nav className="flex mx-4 p-2 justify-between items-center">
        <div className="mr-4">
          <Link to="/">
            <div>Logo</div>
          </Link>
        </div>
        <ul className="flex sm:gap-2 md:gap-4 items-center">
          {navItems.map((navItem, index) => (
            <li key={index} className="hover:bg-red-100 rounded-full p-2">
              <Link to={navItem.slug}>{navItem.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

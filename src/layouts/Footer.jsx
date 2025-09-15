import React from "react";
import { FacebookFilled } from "@ant-design/icons";
import { footerData } from "../PageData/footerData.js";
import Containerrepair from "../components/Containerrepair.jsx";

const Footer = () => {
  const { topServices, columns, contact, disclaimer, copyright } = footerData;

  return (
    <footer className="bg-gray-50 text-gray-800">
      {/* top services */}

      <Containerrepair className="mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {topServices.map((item, idx) => (
          <div key={idx}>
            <h4 className="font-semibold underline">{item.title}</h4>
            <p className="text-sm">{item.desc}</p>
          </div>
        ))}
      </Containerrepair>
      <Containerrepair>
        <hr className="border-gray-200" />
      </Containerrepair>

      {/* columns */}
      <Containerrepair className="mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
        {columns.map((col, idx) => (
          <div key={idx}>
            <h5 className="font-semibold mb-2">{col.heading}</h5>
            <ul className="space-y-1">
              {col.links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:underline">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Containerrepair>

      <Containerrepair>
        <hr className="border-gray-200" />
      </Containerrepair>

      {/* contact */}
      <Containerrepair className="px-4 py-6 text-center md:text-left flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
        <div>
          Phone: <span className="font-semibold">{contact.phone}</span> | Hours:{" "}
          <span className="font-semibold">{contact.hours}</span> | E-mail:{" "}
          <a
            href={`mailto:${contact.email}`}
            className="font-semibold hover:underline"
          >
            {contact.email}
          </a>
        </div>
        <div className="flex justify-center md:justify-end space-x-3">
          {contact.socials.map((social, idx) => {
            if (social.icon === "facebook") {
              return (
                <a
                  key={idx}
                  href={social.href}
                  className="text-gray-800 hover:text-blue-600"
                >
                  <FacebookFilled style={{ fontSize: "20px" }} />
                </a>
              );
            }
            return null; // add other icons similarly
          })}
        </div>
      </Containerrepair>

      {/* bottom bar */}
      <div className="bg-gray-600 text-gray-200 text-xs py-4 px-4">
        <Containerrepair className="mx-auto text-center">
          {disclaimer}
          <br />
          {copyright}
        </Containerrepair>
      </div>
    </footer>
  );
};

export default Footer;

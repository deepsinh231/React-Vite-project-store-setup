import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";

const SettingsDrawer = () => {
  const [theme, setTheme] = useState("light");
  const [color, setColor] = useState("blue");

  // Load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "light";
    const savedColor = localStorage.getItem("app-color") || "blue";
    setTheme(savedTheme);
    setColor(savedColor);
    applyStyles(savedTheme, savedColor);
  }, []);

  // Apply styles dynamically
  const applyStyles = (themeValue, colorValue) => {
    document.body.setAttribute("data-theme", themeValue);
    document.body.style.backgroundColor =
      themeValue === "dark" ? "#0f172a" : "#f9fafb";
    document.body.style.setProperty("--accent-color", colorValue);
  };

  const handleThemeChange = (value) => {
    setTheme(value);
    localStorage.setItem("app-theme", value);
    applyStyles(value, color);
  };

  const handleColorChange = (value) => {
    setColor(value);
    localStorage.setItem("app-color", value);
    applyStyles(theme, value);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button
            size="large"
            shape="circle"
            type="default"
            style={{ backgroundColor: "white", width: "50px", height: "50px" }}
            className="shadow-xl border-[#000000] border-4 bg-red-500 text-white"
            icon={
              <SettingOutlined className="transition-transform text-4xl hover:rotate-180 duration-500" />
            }
          />
        </DrawerTrigger>

        <DrawerContent className="w-[340px] sm:w-[400px] p-6 bg-white  border-l border-gray-200  rounded-l-xl">
          <DrawerHeader>
            <DrawerTitle className="text-lg font-bold text-gray-900">
              App Settings
            </DrawerTitle>
            <DrawerDescription className="text-gray-500">
              Personalize your dashboard experience
            </DrawerDescription>
          </DrawerHeader>

          {/* Theme Toggle */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-2">Theme</h4>
            <div className="flex gap-3">
              <Button
                type={theme === "light" ? "primary" : "default"}
                onClick={() => handleThemeChange("light")}
              >
                🌞 Light
              </Button>
              <Button
                type={theme === "dark" ? "primary" : "default"}
                onClick={() => handleThemeChange("dark")}
              >
                🌙 Dark
              </Button>
            </div>
          </div>

          {/* Accent Colors */}
          <div className="mt-8">
            <h4 className="font-semibold text-gray-800 mb-2">Accent Color</h4>
            <div className="flex gap-4">
              {["blue", "green", "purple", "red", "orange"].map((c) => (
                <button
                  key={c}
                  onClick={() => handleColorChange(c)}
                  className={`h-10 w-10 rounded-full border-4 transition-transform hover:scale-110 ${
                    color === c
                      ? "border-gray-900 dark:border-white"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <DrawerFooter className="mt-10 flex justify-between">
            <Button
              danger
              onClick={() => {
                handleThemeChange("light");
                handleColorChange("blue");
              }}
            >
              Reset
            </Button>
            <DrawerClose asChild>
              <Button type="default">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SettingsDrawer;

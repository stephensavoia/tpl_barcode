import type { CustomFlowbiteTheme } from "flowbite-react";

const tailwindFlowbiteTheme: CustomFlowbiteTheme = {
  card: {
    root: {
      children: "flex h-full flex-col justify-center gap-4 px-6 pt-6 pb-1",
    },
  },
  label: {
    root: {
      base: "block text-md font-medium text-white",
    },
  },
  textInput: {
    field: {
      input: {
        sizes: {
          md: "text-md",
        },
      },
    },
  },
  select: {
    field: {
      select: {
        sizes: {
          md: "text-md",
        },
      },
    },
  },
  carousel: {
    root: {
      base: "relative h-full w-full",
      leftControl:
        "absolute left-0 top-0 flex h-full items-center justify-center focus:outline-none",
      rightControl:
        "absolute right-0 top-0 flex h-full items-center justify-center focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-gray-200 border border-gray-300 hover:bg-gray-50",
        on: "bg-blue-700 dark:bg-gray-800",
      },
      base: "h-3 w-3 rounded-full",
      wrapper:
        "absolute -translate-y-3 left-1/2 flex -translate-x-1/2 space-x-5",
    },
    control: {
      base: "inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 border border-gray-300 group-hover:bg-gray-200 group-focus:outline-none group-focus:ring-2 group-focus:ring-cyan-500 md:h-10 md:w-10",
      icon: "h-7 w-7 text-[#6B7280] sm:h-6 sm:w-6",
    },
  },
  button: {
    size: {
      md: "px-4 py-2 text-md",
    },
  },
};

export default tailwindFlowbiteTheme;

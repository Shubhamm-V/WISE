interface Tab {
  name: string;
  title: string;
  icon: string;
  focusIcon: string;
}

export const TABS: Tab[] = [
  {
    name: "home",
    title: "Home",
    icon: "home-outline",
    focusIcon: "home",
  },
  {
    name: "water-reminder",
    title: "water-reminder",
    icon: "water-outline",
    focusIcon: "water",
  },
  {
    name: "period-tracker",
    title: "period-tracker",
    icon: "calendar-clear-outline",
    focusIcon: "calendar-clear",
  },
  {
    name: "hospitals",
    title: "Hospitals",
    icon: "medkit-outline",
    focusIcon: "medkit",
  },
  {
    name: "videos",
    title: "Videos",
    icon: "videocam-outline",
    focusIcon: "videocam",
  },
];

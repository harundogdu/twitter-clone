import { IconType } from "react-icons";

export interface ISidebarType {
  label: string;
  href: string;
  icon: IconType;
  secondaryIcon?: IconType;
  onClick?: () => void;
  public?: boolean;
}

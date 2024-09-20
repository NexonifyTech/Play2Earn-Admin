
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";



export const sidebarItems = [
  {
    "id": 1,
    "label": " Dashboard",
    "parent_id": null,
    "icon":<MdOutlineAdminPanelSettings size={20} />,
    "order_index": 1,
    "url": "/admin/dashboard"
  },
  {
    "id": 2,
    "label": "Notification",
    "parent_id": null,
    "icon":<FaBell  size={20} />,
    "order_index": 2,
    "url": "/admin/notification"
  },

  {
    "id": 3,
    "label": "Settings",
    "parent_id": null,
    "icon":<IoSettingsSharp   size={20} />,
    "order_index": 3,
    "url": "/admin/settings"
  },


];

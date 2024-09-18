
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaBell } from "react-icons/fa";



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
];

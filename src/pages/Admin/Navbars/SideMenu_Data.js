
import { FaBell, FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";



export const sidebarItems = [
  {
    "id": 1,
    "label": " User List",
    "parent_id": null,
    "icon":<FaUser  size={20} />,
    "order_index": 1,
    "url": "/admin/user-list"
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
  {
    "id": 4,
    "label": "Transaction",
    "parent_id": null,
    "icon":<RiMoneyRupeeCircleFill    size={20} />,
    "order_index": 4,
    "url": "/admin/transaction"
  },


];

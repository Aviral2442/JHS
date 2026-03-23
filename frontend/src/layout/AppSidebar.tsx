import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { BiCategory } from "react-icons/bi";

// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PieChartIcon,
  PlugInIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { BookAIcon, User, UserCheck } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

type SidebarOperation = {
  operations_id?: number;
  operation_id?: number;
  operation_name: string;
  operation_url: string;
};

type SidebarModule = {
  module_id: number;
  module_name: string;
  operations: SidebarOperation[];
};

const navItems: NavItem[] = [
  {
    icon: <PieChartIcon />, // Dashboard icon updated
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <BoxCubeIcon />, // Consumers icon updated
    name: "Consumers",
    path: "/admin/consumer",
  },
  {
    icon: <GridIcon />, // Vendor icon updated
    name: "Vendor",
    // path: "/admin/vendor",
    subItems: [
      { name: "Vendor List", path: "/admin/category/level-one", pro: false },
      { name: "Vendor Referrals", path: "/admin/category/level-two", pro: false },
      { name: "Live Tracking", path: "/admin/category/level-three", pro: false },
    ],
  },
  {
    icon: <UserCheck />, // Categories icon updated
    name: "Categories",
    subItems: [
      { name: "Level One", path: "/admin/category/level-one", pro: false },
      { name: "Level Two", path: "/admin/category/level-two", pro: false },
      { name: "Level Three", path: "/admin/category/level-three", pro: false },
    ],
  },
  {
    icon: <BookAIcon />,
    name: "Services",
    subItems: [
      { name: "Cleaning Services", path: "/admin/services/manage-cleaning-service", pro: false },
      { name: "Interior Design Services", path: "/admin/services/manage-interior-design-service", pro: false },
      { name: "Furniture Services", path: "/admin/services/manage-furniture-service", pro: false },
      // { name: "Carpenter Services", path: "/admin/category/level-two", pro: false },
      // { name: "Painting Services", path: "/admin/category/level-two", pro: false },
      { name: "Pest Control Services", path: "/admin/services/manage-pest-control-service", pro: false },
      // { name: "Plumber Services", path: "/admin/category/level-two", pro: false },
      // { name: "Electrician Services", path: "/admin/category/level-two", pro: false },
    ],
  },
  {
    icon: <User />, // Booking icon updated
    name: "Booking",
    subItems: [
      { name: "Cleaning Services", path: "/admin/booking", pro: false },
      { name: "Interior Design Services", path: "/admin/services/manage-interior-design-service", pro: false },
      { name: "Furniture Services", path: "/admin/services/manage-furniture-service", pro: false },
      { name: "Pest Control Services", path: "/admin/services/manage-pest-control-service", pro: false },
    ],
  },
  {
    icon: <BiCategory />, // Transactions icon updated
    name: "Transactions",
    subItems: [
      { name: "Razorpay", path: "/admin/transactions/razorpay", pro: false },
      { name: "Consumers", path: "/admin/transactions/consumer", pro: false },
      { name: "Vendors", path: "/admin/transactions/vendor", pro: false },
    ],
  },
  {
    icon: <BookAIcon />, // Blogs icon updated
    name: "Blogs",
    path: "/admin/blog",
  },
  {
    icon: <BiCategory />, // Contact Forms icon updated
    name: "Contact Forms Enquiry",
    path: "/admin/contact-forms",
  },
  //   {
  //     icon: <CalenderIcon />,
  //     name: "Calendar",
  //     path: "/admin/calendar",
  //   },
  //   {
  //     icon: <UserCircleIcon />,
  //     name: "User Profile",
  //     path: "/admin/profile",
  //   },
  //   {
  //     name: "Forms",
  //     icon: <ListIcon />,
  //     subItems: [
  //       { name: "Form Elements", path: "/admin/form-elements", pro: false },
  //     ],
  //   },
  //   {
  //     name: "Tables",
  //     icon: <TableIcon />,
  //     subItems: [
  //       { name: "Basic Tables", path: "/admin/basic-tables", pro: false },
  //       { name: "Partners", path: "/admin/partner", pro: false },
  //     ],
  //   },
  //   {
  //     name: "Pages",
  //     icon: <PageIcon />,
  //     subItems: [
  //       { name: "Blank Page", path: "/admin/blank", pro: false },
  //       { name: "404 Error", path: "/admin/error-404", pro: false },
  //     ],
  //   },
];

const othersItems: NavItem[] = [
  {
    icon: <User />,
    name: "Settings",
    subItems: [
      { name: "Blank Page", path: "/admin/blank", pro: false },
      { name: "404 Error", path: "/admin/error-404", pro: false },
    ],
  },
  {
    icon: <User />,
    name: "RBAC",
    subItems: [
      { name: "Roles", path: "/admin/roles", pro: false },
      { name: "Modules", path: "/admin/modules", pro: false },
      { name: "Operations", path: "/admin/operations", pro: false },
    ],
  },
  {
    icon: <UserCheck />,
    name: "Admin",
    path: "/admin/admin-users",
  },

  // {
  //   icon: <PieChartIcon />,
  //   name: "Charts",
  //   subItems: [
  //     { name: "Line Chart", path: "/admin/line-chart", pro: false },
  //     { name: "Bar Chart", path: "/admin/bar-chart", pro: false },
  //   ],
  // },
  // {
  //   icon: <BoxCubeIcon />,
  //   name: "UI Elements",
  //   subItems: [
  //     { name: "Alerts", path: "/admin/alerts", pro: false },
  //     { name: "Avatar", path: "/admin/avatars", pro: false },
  //     { name: "Badge", path: "/admin/badge", pro: false },
  //     { name: "Buttons", path: "/admin/buttons", pro: false },
  //     { name: "Images", path: "/admin/images", pro: false },
  //     { name: "Videos", path: "/admin/videos", pro: false },
  //   ],
  // },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/admin/auth/sign-in", pro: false },
      { name: "Sign Up", path: "/admin/auth/sign-up", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_URL || "http://localhost:5000";
  const [sidebar, setSidebar] = useState<SidebarModule[]>([]);

  const token = localStorage.getItem("admin_token");
  if (!token) {
    console.warn("No token found in localStorage. Sidebar data will not be fetched.");
  }

  const decodedToken: { roleId?: number } | null = token
    ? jwtDecode(token)
    : null;
  const roleId = decodedToken?.roleId;
  // console.log(roleId)
  const fetchSidebarData = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/api/role-base-access-control/sidebar`, {
        params: {
          roleId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Fetch Sidebar Response:", response);
      if (response.data?.status === 200) {
        const nextSidebar = response.data?.jsonData?.sidebar;
        if (Array.isArray(nextSidebar)) {
          setSidebar(nextSidebar);
        }
        console.log("Fetched Sidebar Data:", response.data.jsonData);
      } else {
        console.error("Failed to fetch sidebar data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sidebar data:", error);
    }
  };

  useEffect(() => {
    fetchSidebarData();
  }, [token, roleId, baseUrl]);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                ? "menu-item-active"
                : "menu-item-inactive"
                } cursor-pointer ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
                }`}
            >
              <span
                className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? "rotate-180 text-brand-500"
                    : ""
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`menu-item-icon-size ${isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path)
                        ? "menu-dropdown-item-active"
                        : "menu-dropdown-item-inactive"
                        }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        {/* <Link to="/admin">
          {isExpanded || isHovered || isMobileOpen ? (
            <div className="bg-transparent">
              <img
                className=""
                src="/images/logo/jsh_logo.png"
                alt="Logo"
                width={50}
                height={40}
              />
            </div>
          ) : (
            <div className="bg-none">
              <img
                src="/images/logo/logo-icon.svg"
                alt="Logo"
                width={32}
                height={32}
              />
            </div>
          )}
        </Link> */}
        {/* Mention The Company Name */}
        <div className="bg-none">
          <img
            src="http://localhost:5173/images/logo.png"
            alt="Logo"
            width={32}
            height={32}
          />
        </div>
        {(isExpanded || isHovered || isMobileOpen) && (
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 ml-3">
            JHS
          </span>
        )}
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {sidebar.length > 0 && (
              <div>
                <h2
                  className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                    }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Permission Menu"
                  ) : (
                    <HorizontaLDots className="size-6" />
                  )}
                </h2>
                <div className="space-y-4">
                  {sidebar.map((module) => (
                    <div key={module.module_id} className="space-y-1">
                      <h4 className="menu-item-text text-xs font-semibold uppercase text-gray-500">
                        {module.module_name}
                      </h4>

                      {module.operations.map((op) => (
                        <div key={op.operations_id ?? op.operation_id} className="ml-2">
                          <Link
                            to={op.operation_url}
                            className={`menu-dropdown-item ${isActive(op.operation_url)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                              }`}
                          >
                            {op.operation_name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
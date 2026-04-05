import { isArray } from "lodash";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function MenuItem({ props, onNavigate }) {
  const [showMenu, setShowMenu] = useState(false);

  const showsubnav = () => {
    setShowMenu(!showMenu);
  };

  const showActive = classNames("ak-munu_dropdown_toggle", {
    active: showMenu,
  });

  const showActivePrent = classNames("menu-item-has-children", {
    active: showMenu,
  });

  return (
    <li className={showActivePrent}>
      <Link
        to={props.link}
        onClick={() => {
          if (typeof onNavigate === "function") onNavigate();
        }}
      >
        {props.title}
      </Link>
      {isArray(props.childern) && (
        <>
          <ul>
            {props?.childern?.map((child) => (
              <li key={child.key}>
                <Link
                  to={child.link}
                  onClick={() => {
                    if (typeof onNavigate === "function") onNavigate();
                  }}
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
          <span className={showActive} onClick={showsubnav}></span>
        </>
      )}
    </li>
  );
}

MenuItem.propTypes = {
  props: PropTypes.object,
  onNavigate: PropTypes.func,
};

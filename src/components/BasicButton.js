import React from "react";
import { Button, Spinner } from "react-bootstrap";
const BasicButton = (props) => {
  const {
    variant,
    onClick,
    label,
    size,
    icon,
    className,
    isLoading,
    loaderVariant,
    loaderSize,
    type
  } = props;
  const buttonStyle = {
    backgroundColor:"#083C7A",
    borderColor: "#083C7A",
    color:"white",
  };
  return (
    <Button
      style={buttonStyle}
      variant={variant}
      className={className}
      size={size}
      type={type}
      onClick={onClick}
      disabled={!isLoading ? false : true}
    >
      {!isLoading ? (
        <>
          {icon} {label}
        </>
      ) : (
        <>
          <Spinner
            size={`${!loaderSize ? "sm" : loaderSize}`}
            variant={`${!loaderVariant ? "#083C7A" : loaderVariant}`}
          />
        </>
      )}
    </Button>
  );
};
export default BasicButton;

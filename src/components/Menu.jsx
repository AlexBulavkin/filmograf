import { NavLink } from "react-router";
import { Flex } from "@chakra-ui/react";

export default function Menu(){
    return (
        <Flex gap="15px" my="30px" alignItems="center">
            <NavLink 
                to="/"
                style={({ isActive }) => ({
                    fontSize: "16px",
                    fontWeight: "medium",
                    textDecoration: "none",
                    color: isActive ? "#3B82F6" : "#374151",
                    hover: {
                        textDecoration: "underline"
                    }
                })}
            >
                Все фильмы
            </NavLink>
            <NavLink 
                to="/saved"
                style={({ isActive }) => ({
                    fontSize: "16px",
                    fontWeight: "medium",
                    textDecoration: "none",
                    color: isActive ? "#3B82F6" : "#374151",
                    hover: {
                        textDecoration: "underline"
                    }
                })}
            >
                Избранное
            </NavLink>
            <NavLink 
                to="/add"
                style={({ isActive }) => ({
                    fontSize: "16px",
                    fontWeight: "medium",
                    textDecoration: "none",
                    color: isActive ? "#3B82F6" : "#374151",
                    hover: {
                        textDecoration: "underline"
                    }
                })}
            >
                Добавить фильм
            </NavLink>
        </Flex>
    )
}
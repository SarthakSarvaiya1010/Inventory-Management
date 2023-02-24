import React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import { PageLoaderAction } from "../../Store/Action/ProductAction/index";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

export default function UsePagination(props) {
  const { countNumbuer, PageNumber } = props;
  const { items } = usePagination({
    count: countNumbuer,
  });

  return (
    <nav>
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? "bold" : undefined,
                  backgroundColor: selected ? "green" : "white",
                  color: selected ? "white" : "green",
                  border: "1px solid grey",
                  padding: "6px 12px",
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            console.log("selected", page);
            children = (
              <button
                style={{
                  backgroundColor: "white",
                  padding: "6px 12px",
                  color:
                    0 === page || items.length === page + 1
                      ? "lightgreen"
                      : "green",
                  border: "1px solid grey",
                }}
                type="button"
                {...item}
              >
                {type}
              </button>
            );
          }

          return (
            <li
              key={index}
              onClick={() => {
                console.log("children", page);
                PageNumber(page);
              }}
            >
              {children}
            </li>
          );
        })}
      </List>
    </nav>
  );
}

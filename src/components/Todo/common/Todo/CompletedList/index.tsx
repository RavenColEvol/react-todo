import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
    Checkbox,
    Container,
    makeStyles,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@material-ui/core";
import { TodoItem } from "../../types";

const useStyles = makeStyles({
    root: {
        display: "flex",
        width: "100%",
    },
    subtitle1: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        padding: "10px 0px 7px",
    },
    accordion: {
        boxShadow: "none",
        borderTop: "1px solid black",
        marginTop: "20px",
    },
    accordionDetails: {
        display: "block",
        paddingLeft: "0px",
    },
    accordionSummary: {
        paddingLeft: "4.2%",
    }
});

export interface TodoCompletedItemsProp {
    items: TodoItem[];
    setItemsCallback: (updatedItems: TodoItem[]) => void;
    itemIndex: number;
}

export const TodoCompletedItem = (props: TodoCompletedItemsProp) => {
    const { items, setItemsCallback, itemIndex } = props;
    const classes = useStyles();
    if (!items[itemIndex].isComplete) return null;

    return (
        <Container className={classes.root}>
            <Checkbox
                checked
                onChange={(e) => {
                    items[itemIndex].isComplete = false;
                    setItemsCallback([...items]);
                }}
            />
            <Typography variant="subtitle1" className={classes.subtitle1}>
                {items[itemIndex].name}
            </Typography>
        </Container>
    );
};

export interface TodoCompletedListProp {
    completedItems: TodoItem[];
    items: TodoItem[];
    setItemsCallback: (updatedItems: TodoItem[]) => void;
}

export const TodoCompletedList = (props: TodoCompletedListProp) => {
    const { completedItems, items, setItemsCallback } = props;
    const completedItemsLength = completedItems.length;
    const classes = useStyles();

    if(completedItemsLength === 0) return null;

    return (
        <Accordion className={classes.accordion} defaultExpanded={true}>
            <AccordionSummary
                className={classes.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>
                    {" "}
                    {completedItemsLength} Completed items{" "}
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                {completedItems.map((item, index) => {
                    return (
                        <TodoCompletedItem
                            items={items}
                            key={item.uuid}
                            itemIndex={index}
                            setItemsCallback={setItemsCallback}
                        />
                    );
                })}
            </AccordionDetails>
        </Accordion>
    );
};

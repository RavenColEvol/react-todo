import React, { useState } from "react";

import { Container } from "@material-ui/core";
import { Item, TodoCompletedList } from "./common";
import { Form } from "./common/Todo/Form";
import { TodoItem } from "./common/types";


export interface TodoAppProps {
    defaultItems?: TodoItem[];
    onChange: (items: TodoItem[]) => void;
}

function TodoApp(props: TodoAppProps) {
    const { defaultItems = [], onChange } = props;
    const [items, setItems] = useState<TodoItem[]>(defaultItems);

    const setItemsCallback = (updatedItems: TodoItem[]) => {
        setItems(updatedItems);
        onChange(updatedItems);
    };
    const addItem = (item: TodoItem | TodoItem[]) => {
        const itemsCopy = [...items];
        if (Array.isArray(item)) {
            item.forEach((it) => {
                itemsCopy.unshift(it);
            });
            setItemsCallback([...itemsCopy]);
        } else {
            itemsCopy.unshift(item);
            setItemsCallback([...itemsCopy]);
        }
    };
    const completedItems = items.filter((item: TodoItem) => item.isComplete);
    const todoItems = items.filter((item: TodoItem) => !item.isComplete);

    return (
        <Container>
            <Form addItem={addItem} />
            {todoItems.map((item, index) => {
                return (
                    <Item
                        items={items}
                        addItem={addItem}
                        key={item.uuid}
                        itemIndex={index}
                        setItemsCallback={setItemsCallback}
                    />
                );
            })}
            <TodoCompletedList
                items={items}
                completedItems={completedItems} 
                setItemsCallback={setItemsCallback}
            />
        </Container>
    );
}

export default TodoApp;

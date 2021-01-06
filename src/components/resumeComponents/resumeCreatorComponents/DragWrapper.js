import React from 'react';

import {Draggable} from 'react-beautiful-dnd';
export const DragWrapper = ({dragId, index, children}) => {
    return (
      <Draggable draggableId={dragId} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {children}
          </div>
        )}
      </Draggable>
    );
}

export default DragWrapper;

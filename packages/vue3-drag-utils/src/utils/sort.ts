export const sortMove = (
  list: any,
  dragIndex: number,
  hoverIndex: number,
  item: any,
  hasItem: any
) => {
  const clone = [...list.value];
  hasItem && clone.splice(dragIndex, 1);
  clone.splice(hoverIndex, 0, item);
  list.value = clone;
};
export const sortHandle = (ref: any, data: any, props: any, monitor: any) => {
  if (!ref.value) {
    return;
  }
  const dragIndex = data.index;
  const hoverIndex = props.index;
  if (dragIndex === hoverIndex && props.hasItem(data)) {
    return;
  }
  props.move(data.data, dragIndex, hoverIndex);
  data.index = hoverIndex;
};

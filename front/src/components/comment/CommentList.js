import CommentElement from "./CommentElement";
const CommentList = ({ example, removeHandler, editHandler }) => {
  return (
    <div className="area">
      {example.map((item) => (
        <CommentElement
          key={item._id}
          item={item}
          removeHandler={removeHandler}
          editHandler={editHandler}
        />
      ))}
    </div>
  );
};

// const Div = styled.div`
//   &:not(:nth-last-of-type(1)) {
//     border-bottom: 1px solid rgba(0, 0, 0, 0.3);
//   }
// `

export default CommentList;

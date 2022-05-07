import ReviewElement from "./ReviewElement";
const ReviewList = ({ example, removeHandler, editHandler }) => {
  console.log({ example });
  return (
    <div className="area">
      {example.map((item) => (
        <ReviewElement
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

export default ReviewList;

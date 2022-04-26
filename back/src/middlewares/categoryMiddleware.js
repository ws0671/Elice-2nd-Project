const categoryMiddleware = (req, res, next) => {
  try {
    const { category } = req.body ?? null;
    const categoryList = [
      "공지사항",
      "자유",
      "꿀팁",
      "건의사항",
      "리뷰",
      "선택 안함",
    ];

    if (!categoryList.includes(category)) {
      throw new Error("잘못된 말머리를 선택하셨습니다.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { categoryMiddleware };

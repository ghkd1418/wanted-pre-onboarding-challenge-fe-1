export const UpdateTodo = ({ onUpdate, title, content }: any) => {
  const submitHandler = (e: any) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    onUpdate(title, content);
  };

  return (
    <form onSubmit={submitHandler}>
      <p>
        <input name="title" placeholder="title" defaultValue={title || ""} />
      </p>
      <p>
        <textarea
          name="content"
          placeholder="content"
          defaultValue={content || ""}
        />
      </p>
      <input type="submit" value="Update" />
    </form>
  );
};

/**
 * 목록에 실시간 반영 => todo.tsx 에 상태를 올려줘야한다,
 * 취소 버튼
 * 삭제 버튼
 * 새로고침시 현상태 유지
 */

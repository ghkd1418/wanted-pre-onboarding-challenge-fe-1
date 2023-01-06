import { Link } from "react-router-dom";

export const List = ({ todos }: any) => {
  const todoList = todos?.map((todo: any) => {
    return (
      <li key={todo.id}>
        <Link to={`/${todo.id}`}>{todo.title}</Link>
      </li>
    );
  });
  return (
    <nav>
      <ul>{todoList}</ul>
    </nav>
  );
};

/**
 * onclick 으로 id 넘기기
 * link로 넘기기 id 넘겨서 받기
 *
 * 개별todo를 조회순서에 따라 페이지 뒤로가기로 조회 할 수 있도록
 * => link 로 구현
 *
 * onclick 으로 id 넘기기   detail로 바로 넘겨주기
 *  api 요청은 detail 컴포넌트에서
 * 이 요청은 해당 목록이 클릭이 됐을 때 발생한다.
 *
 * updata, delete 시에도 해당 id 를 알고 있어야하고
 * 클릭했을때 버튼이 생성되야함.
 *
 *
 */

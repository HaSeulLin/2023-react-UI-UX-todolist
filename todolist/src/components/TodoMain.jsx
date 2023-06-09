import { useState } from "react";
import './todoMain.css';

// id 시작 변수
let globalId = 4;
let todayDate = new Date().toLocaleDateString();

const TodoMain = (props) => {
    {/** const */}
    // Todo 받아올 공간
    const [todoList, setTodoList] = useState(
        [
            {id: 1, today: "2023. 4. 5.", todo: "예시입니다", checked: false}
        ]
    );

    // 추가 todo 받아올 공간
    const [inputTodo, setInputTodo] = useState("");
    // 전체/오늘 버튼 받아올 공간
    // btn 안 누른 상태 default : all
    const [btnState, setBtnState] = useState("all");

    {/** 메소드 공간 */}
    // input text에서 TO DO 이름 받아오는 메소드
    // input text - onChange
    const inputChange = (e) => {setInputTodo(e.target.value)}
    // input text 저장 공간
    // button 누르면 입력 받은 todo 출력
    const addTodo = () => {
        const newTodo = todoList.concat (
            {   
                id : globalId++,
                today: new Date().toLocaleDateString(),
                todo: inputTodo,
                checked: false
            }
        );
        setTodoList(newTodo);
    }
    // button 누르면 해당 li 삭제 >> filter
    const deleteList = (id) => {
        const newList = todoList.filter(
            (n) => n.id !== id
        );
        setTodoList(newList);
    }
    // 모든 할일 - 오늘 할일 구분해서 보여주기
    // 모든 할일 버튼 상태 - all, 오늘 할일 버튼 상태 today
    const AllBtn = () => {setBtnState("all");};
    const TodayBtn = () => {setBtnState("today");};
    const showTodo = () => {
        let allTodo = Array.from(todoList);
        let todayTodo = Array.from(todoList);
        if (btnState=="all"){
            return allTodo;
        }
        else {
            return (
                todayTodo.filter((todo)=>
                todo.today === todayDate)
            );
        }
    }

    return(
    <div className="mainDiv">
        <h1>To Do List</h1>
        <div className="inputTodo">
            <input type="text"
                // 할일 입력 받아옴
                onChange={inputChange}
                placeholder="Todo를 입력하세요."
            />
            <button
                // 클릭 시 li에 할일 추가
                onClick={addTodo}
            >+
            </button>
        </div>
        <hr />
        <div className="showTodo">
            <button
                onClick={AllBtn}
            >모든 할일</button>
            <button 
                onClick={TodayBtn}
            >오늘 할일</button>
        </div>
        <ul className="todoList">
            {
                // map으로 불러와 li 생성
                showTodo().map((todo)=>
                <li key={todo.id}>
                    <p
                        className={todo.checked ? "on" : ""}
                    >{todo.today}</p>
                    <input type="checkbox"
                    // check 시 color 변경, 취소선 >> class "on"으로
                    // map으로 불러와 checked 상태 바꾸기 
                        checked={todo.checked} readOnly
                        onClick={()=> {
                            const onOffCheck = todoList.map((c)=>{
                                if (todo.id !== c.id) {
                                    return c;
                                }
                                else {
                                    return {...c, checked: !c.checked}
                                }
                            });
                            setTodoList(onOffCheck);
                        }}
                    />
                    <span
                        className={todo.checked ? "on" : ""}
                    >{todo.todo}</span>
                    <button
                    // onClick 시 해당 li 삭제 버튼
                        onClick={()=>deleteList(todo.id)}
                    >x</button>
                </li>)
            }
        </ul>
    </div>
    );
} 

export default TodoMain
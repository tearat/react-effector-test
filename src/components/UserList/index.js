import { useStore } from 'effector-react';
import { useState } from 'react';
import faker from 'faker/locale/ru';
import { $users, updateUser, deleteUser } from '../../models/users';
import s from './index.module.scss';

export const UserList = () => {
  const users = useStore($users);

  const [increment, setIncrement] = useState(0);

  const mockUser = () => {
    setIncrement(increment + 1);
    return {
      id: increment,
      name: faker.name.findName(),
      age: Math.round(Math.random() * 100),
      gender: Math.round(Math.random()) ? 'Мужчина' : 'Женщина',
    };
  };

  const usersItems = users.map((user) => (
    <div key={user.id} className={s.gridCell}>
      <div>#{user.id}</div>
      <div>{user.name}</div>
      <div>{user.age} лет</div>
      <div>{user.gender}</div>
      <hr />
      <button className={s.btnDelete} onClick={() => deleteUser(user)}>
        Del
      </button>
    </div>
  ));

  return (
    <div className={s.userList}>
      <div className={s.panel}>
        <button onClick={() => updateUser(mockUser())} className={s.btnAdd} type="button">
          Born
        </button>
      </div>
      <div className={s.grid}>
        {usersItems}
      </div>
    </div>
  );
};

export default UserList;

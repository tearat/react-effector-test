import { createStore, createEvent } from 'effector';

// Создаем хранилище, в котором будет лежать массив пользователей
export const $users = createStore([]);

// Создаем события
export const updateUser = createEvent();
export const deleteUser = createEvent();

// Обычный хендлер на обновление. Добавляем или изменяем пользователя
const updateOrCreateUserAction = (state, payload) => {
  const userIndex = state.findIndex((user) => user.id === payload.id);

  // Если есть такой id, то заменяем запись
  // Если нет, то нового создаём
  if (userIndex > -1) {
    state.splice(userIndex, 1, payload);
  } else {
    state.push(payload);
  }

  // Возвращаем измененный стейт
  return [...state];
};

// Удаляем пользователя по id
const deleteUserAction = (state, payload) => {
	const userIndex = state.findIndex((user) => user.id === payload.id);
	
	// Удаляем пользователя из массива
  if (userIndex > -1) {
		state.splice(userIndex, 1);
	}
	
	return [...state];
};

// Подписываемся на события в хранилище
$users.on(updateUser, updateOrCreateUserAction);
$users.on(deleteUser, deleteUserAction);

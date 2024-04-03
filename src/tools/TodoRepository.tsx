import { FirebaseError } from 'firebase/app';
import { DocumentData, FirestoreError, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export type Todo = {
  id?: string,
  created?: number,
  text: string,
  completed: boolean,
}

class TodoRepository {
  static async addTodo(userId: string, todo: Todo): Promise<void | FirebaseError> {
    try {
      todo.created = Date.now();
      const todoCollectionRef = collection(db, `users/${userId}/todos`);
      await addDoc(todoCollectionRef, todo);
    } catch (error) {
      return error as FirebaseError;
    }
  }

  static async addTodos(userId: string, todos: Todo[]): Promise<void | FirebaseError[]> {
    const errors: FirebaseError[] = [];
    for (const todo of todos) {
      const result = await this.addTodo(userId, todo);
      if (result) {
        errors.push(result);
      }
    }

    if (errors.length > 0) {
      return errors;
    }
  }

  static async getTodo(userId: string, todoId: string): Promise<Todo | null | FirebaseError> {
    try {
      const todoDocRef = doc(db, `users/${userId}/todos`, todoId);
      const todoDocSnapshot = await getDoc(todoDocRef);
      
      if (!todoDocSnapshot.exists()) {
        return null;
      }

      const todoData = todoDocSnapshot.data();
        return {
          id: todoDocSnapshot.id,
          ...todoData
        } as Todo;
    } catch (error) {
      const err = error as FirebaseError;
      return err;
    }
  }

  static async getTodos(userId: string): Promise<Todo[] | FirebaseError> {
    try {
      const todoCollectionRef = collection(db, `users/${userId}/todos`);
      const querySnapshot = await getDocs(todoCollectionRef);

      return querySnapshot.docs.map(doc => {
        const todoData = doc.data();
        return {
          id: doc.id,
          ...todoData
        } as Todo;
      });
    } catch (error) {
      return error as FirebaseError;
    }
  }

  static async updateTodo(userId: string, todoId: string, todo: Todo): Promise<void | FirebaseError> {
    try {
      const todoDocRef = doc(db, `users/${userId}/todos`, todoId);
      await updateDoc(todoDocRef, todo);
    } catch (error) {
      return error as FirebaseError;
    }
  }

  static async deleteTodo(userId: string, todoId: string): Promise<void | FirebaseError> {
    try {
      const todoDocRef = doc(db, `users/${userId}/todos`, todoId);
      await deleteDoc(todoDocRef);
    } catch (error) {
      return error as FirebaseError;
    }
  }

  static subscribeToTodoUpdates(userId: string, callback: (todos: Todo[]) => void, errorCallback: (error: FirestoreError) => void): () => void {
    const todoCollectionRef = query(collection(db, `users/${userId}/todos`), orderBy('created', 'asc'));
    const unsubscribe = onSnapshot(todoCollectionRef,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const tasks: Todo[] = querySnapshot.docs.map(doc => {
          const todoData = doc.data();
          return {
            id: doc.id,
            ...todoData
          } as Todo;
        });
        callback(tasks);
      }, errorCallback);

    return unsubscribe;
  }
    
}

export default TodoRepository;


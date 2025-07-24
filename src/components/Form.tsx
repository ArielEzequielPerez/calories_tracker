import { useState } from "react";
import type { Dispatch } from "react";
import type { FormEvent } from "react";
import type { ChangeEvent } from "react";
import {v4 as uuidv4} from 'uuid'
import type { Activity } from "../types";
import { categories } from "../data/categories";
import type { ActivityAction } from "../reducers/activityReducer";
type FormProps = {
  dispatch: Dispatch<ActivityAction>;
};

const initialState:Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};
export default function Form({ dispatch }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  const isValid = () => {
    const { name, calories } = activity;
    return name.length > 0 && calories > 0;
  }
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'save-activity',
      payload: { newActivity: activity },
    });
    setActivity({...initialState, id: uuidv4() });
    
  };
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          id="category"
          className="border border-slate-300 rounded-lg p-2 w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad
        </label>
        <input
          id="name"
          className="border border-slate-300 rounded-lg p-2 w-full bg-white"
          placeholder="Ej: pesas, Pesas, Jugo de Naranja"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias
        </label>
        <input
          id="calories"
          className="border border-slate-300 rounded-lg p-2 w-full bg-white"
          placeholder="Ej: pesas, Pesas, Jugo de Naranja"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bol uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Actividad'}
        disabled={!isValid()}
      />
    </form>
  );
}

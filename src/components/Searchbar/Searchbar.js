import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

function Searchbar ({ onSubmit }) {
  const [name, setName] = useState('');

  const handleChange = e => {
   setName(e.currentTarget.value.toLowerCase());
    };

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '') {
      toast.error('Enter name image.');
      return;
    }
    onSubmit(name);
    setName('');
    }

    return (
      <>
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
          <input
          className={s.input}
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Search images and photos"
          />

          <button type="submit" className={s.button} >
            <span className={s.buttonLabel}>Search</span>
          </button>
        </form>
      </header>
      </>
      );
    }

export default Searchbar;


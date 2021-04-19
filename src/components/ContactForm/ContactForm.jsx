import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import shortid from 'shortid';
import { form, label, input, button } from './ContactForm.module.scss';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

// const mapStateToProps = state => {
//   return {
//     contacts: contactsSelectors.getContacts(state),
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   onSubmit: newContact => dispatch(contactsOperations.addContact(newContact)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getContacts);
  const onSubmit = useCallback(
    newContact => dispatch(contactsOperations.addContact(newContact)),
    [dispatch],
  );

  // const state = {
  //   name: '',
  //   number: '',
  // };

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  const handleInput = event => {
    const { name, value } = event.currentTarget;
    // this.setState({
    //   [name]: value,
    // });
    name === 'name' ? setName(value) : setNumber(value);
  };

  const reset = () => {
    // this.setState({ name: '', number: '' });
    setName('');
    setNumber('');
  };

  const sameContact = (contactName, contacts) => {
    return contacts.find(({ name }) => {
      return name.toLowerCase() === contactName.toLowerCase();
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (sameContact(name, contacts.items)) {
      alert(`${name} is already in contacts`);
      return;
    }

    if (name === '') {
      alert('Введите имя контакта');
      return;
    }
    onSubmit({ name, number });
    reset();
    return;
  };

  return (
    <form className={form} onSubmit={handleSubmit}>
      <label className={label} htmlFor={nameInputId}>
        Name
        <input
          className={input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={handleInput}
          id={nameInputId}
        ></input>
      </label>
      <label className={label} htmlFor={numberInputId}>
        Number
        <input
          className={input}
          type="text"
          name="number"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          required
          value={number}
          onChange={handleInput}
          id={numberInputId}
        ></input>
      </label>
      <button className={button} type="submit">
        Add contact
      </button>
    </form>
  );
}

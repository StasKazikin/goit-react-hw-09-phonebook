import React, { useCallback } from 'react';
import { list, item, button } from './ContactList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from '../../redux/contacts';

// const mapStateToProps = state => ({
//   contacts: contactsSelectors.getFilteredContacts(state),
// });

// const mapDispatchToProps = dispatch => ({
//   deleteContact: id => dispatch(contactsOperations.deleteContact(id)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsSelectors.getFilteredContacts);
  const deleteContact = useCallback(
    id => dispatch(contactsOperations.deleteContact(id)),
    [dispatch],
  );

  return (
    <ul className={list}>
      {contacts.map(({ name, number, id }) => (
        <li className={item} key={id}>
          <span>
            {name}: {number}
          </span>
          <button
            className={button}
            id={id}
            type="button"
            onClick={() => deleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

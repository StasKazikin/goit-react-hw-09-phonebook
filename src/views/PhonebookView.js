import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from '../components/ContactForm';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';
import { contactsOperations, contactsSelectors } from '../redux/contacts';

// const mapStateToProps = state => ({
//   isLoading: contactsSelectors.getLoading(state),
// });

// const mapDispatchToProps = dispatch => ({
//   fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(PhonebookView);

export default function PhonebookView() {
  const dispatch = useDispatch();
  const isLoading = useSelector(contactsSelectors.getLoading);

  // componentDidMount() {
  //   this.props.fetchContacts();
  // }

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading && <h1>Загружаются контакты</h1>}
      <ContactList />
    </div>
  );
}
